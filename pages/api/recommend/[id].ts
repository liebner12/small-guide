import { NextApiRequest, NextApiResponse } from 'next';
import natural from 'natural';
import { collection, getDocs, query, limit } from '@firebase/firestore';
import { db } from '../../../firebase';
import { ArrayTrips, Trip } from '../../../logic/Types/trip';

const { TfIdf } = natural;

type ArrayOfTerms = Array<{
  name: string;
  value: number;
}>;

type ArraySimilarities = {
  id: string;
  terms: ArrayOfTerms;
};

type Result = {
  id: string;
  similarities: Array<{
    id: string;
    value: number;
  }>;
};

type Formatted = {
  id: string;
  content: string[];
};

const formatTrip = (trip: Trip) => {
  const formatted = (
    trip.name +
    ' ' +
    trip.desc +
    ' ' +
    trip.tags.join(' ') +
    ' ' +
    +(trip.place + ' ').repeat(10) +
    (trip.category + ' ').repeat(10)
  )
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, '');

  return formatted.split(' ');
};

const formatList = (list: ArrayTrips) => {
  const outputList = list.map((item) => {
    return { id: item.id, content: formatTrip(item) };
  });
  return outputList;
};

const request = async () => {
  const list: any = [];
  const q = query(collection(db, 'trips'), limit(20));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({
      ...doc.data(),
      id: doc.id,
      timeStamp: doc.data().timeStamp.toDate().toDateString(),
    });
  });

  return list;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;
    const inputList = await request().catch(() =>
      res.status(500).json({ message: 'Error' })
    );
    const formattedList = formatList(inputList);

    const getTfIdf = (processedDocs: Array<Formatted>) => {
      const tfidf = new TfIdf();

      processedDocs.forEach((processedDocument: any) => {
        tfidf.addDocument(processedDocument.content);
      });

      const terms = (id: number) =>
        tfidf.listTerms(id).map((term) => {
          return { name: term.term, value: term.tfidf };
        });

      return processedDocs.map((item, index) => {
        return { id: item.id, terms: terms(index) };
      });
    };

    const dotProduct = (terms: ArrayOfTerms, comparableTerms: ArrayOfTerms) => {
      let result = 0;
      terms.forEach((item) => {
        const exits = comparableTerms.find((term) => term.value === item.value);
        if (exits) {
          result += item.value * exits.value;
        }
      });

      return result;
    };

    const getLength = (array: ArrayOfTerms) => {
      let length = 0;

      array.forEach((k) => {
        const findItem = array.find((item) => item.value === k.value);
        if (findItem) length += findItem.value * findItem.value;
      });

      return Math.sqrt(length);
    };

    const similarity = (
      terms: ArraySimilarities,
      comparableTerms: ArraySimilarities
    ) => {
      return {
        id: comparableTerms.id,
        value:
          dotProduct(terms.terms, comparableTerms.terms) /
          (getLength(terms.terms) * getLength(comparableTerms.terms)),
      };
    };

    const calcSimilaritiesTfidf = () => {
      const tfidfs = getTfIdf(formattedList);

      return tfidfs.map((item) => {
        return {
          id: item.id,
          similarities: tfidfs.map((comparableTerms) =>
            similarity(item, comparableTerms)
          ),
        };
      });
    };

    const similaritiesList = calcSimilaritiesTfidf();

    const similaritiesListFiltered = similaritiesList.map((item) => {
      return {
        id: item.id,
        similarities: item.similarities.filter((item) => item.value < 0.95),
      };
    });

    const getTopFive = (similarDocument: Result) => {
      return similarDocument.similarities
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .flatMap((item) => item.id);
    };

    const getSimilarDocuments = (id: string | string[]) => {
      const similarDocuments = similaritiesListFiltered.find(
        (item) => item.id === id
      );

      if (similarDocuments) {
        return getTopFive(similarDocuments);
      }

      return [];
    };

    const responseResult = () => {
      return getSimilarDocuments(id).map((id) =>
        inputList.find((trip: Trip) => trip.id === id)
      );
    };

    res.json({
      content: responseResult(),
    });
  } catch {
    res.status(500).json({ message: 'Error' });
  }
}
