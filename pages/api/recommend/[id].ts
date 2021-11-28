import { NextApiRequest, NextApiResponse } from 'next';
const Vector = require('vector-object');
import natural from 'natural';
import { collection, getDocs, query, limit } from '@firebase/firestore';
import { db } from '../../../firebase';
import { ArrayTrips, Trip } from '../../../logic/Types/trip';
const sw = require('stopword');
const { TfIdf, PorterStemmer } = natural;

const formatTrip = (trip: Trip) => {
  const formatted = (
    trip.name +
    ' ' +
    trip.desc +
    ' ' +
    trip.tags.join(' ').repeat(4) +
    ' ' +
    +(trip.place + ' ').repeat(20) +
    (trip.category + ' ').repeat(10)
  )
    .toLocaleLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g, '');

  return sw
    .removeStopwords(formatted.split(' '))
    .map((word: any) => PorterStemmer.stem(word));
};

const formatList = (list: ArrayTrips) => {
  const outputList = list.map((item) => {
    return { id: item.id, content: formatTrip(item) };
  });
  return outputList;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;

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

    const inputList = await request().catch(() =>
      res.status(500).json({ message: 'Error' })
    );

    const formattedList = formatList(inputList);
    const createVectorsFromDocs = (processedDocs: any) => {
      const tfidf = new TfIdf();

      processedDocs.forEach((processedDocument: any) => {
        tfidf.addDocument(processedDocument.content);
      });

      const documentVectors = [];

      for (let i = 0; i < processedDocs.length; i += 1) {
        const processedDocument = processedDocs[i];
        const obj: any = {};

        const items = tfidf.listTerms(i);

        for (let j = 0; j < items.length; j += 1) {
          const item = items[j];
          obj[item.term] = item.tfidf;
        }

        const documentVector = {
          id: processedDocument.id,
          vector: new Vector(obj),
        };

        documentVectors.push(documentVector);
      }
      return documentVectors;
    };

    const calcSimilarities = (docVectors: any) => {
      // number of results that you want to return.
      const MAX_SIMILAR = 5;
      // min cosine similarity score that should be returned.
      const MIN_SCORE = 0.55;
      const data: any = {};

      for (let i = 0; i < docVectors.length; i += 1) {
        const documentVector = docVectors[i];
        const { id } = documentVector;

        data[id] = [];
      }

      for (let i = 0; i < docVectors.length; i += 1) {
        for (let j = 0; j < i; j += 1) {
          const idi = docVectors[i].id;
          const vi = docVectors[i].vector;
          const idj = docVectors[j].id;
          const vj = docVectors[j].vector;
          const similarity = vi.getCosineSimilarity(vj);

          if (similarity > MIN_SCORE) {
            data[idi].push({ id: idj, score: similarity });
            data[idj].push({ id: idi, score: similarity });
          }
        }
      }

      Object.keys(data).forEach((id) => {
        data[id].sort((a: any, b: any) => b.score - a.score);

        if (data[id].length > MAX_SIMILAR) {
          data[id] = data[id].slice(0, MAX_SIMILAR);
        }
      });

      return data;
    };

    const filterList = (id: string) => {
      return inputList.filter((item: Trip) => item.id === id);
    };

    const getSimilarDocuments = (id: any, trainedData: any) => {
      const similarDocuments = trainedData[id];

      if (similarDocuments === undefined) {
        return [];
      }

      return similarDocuments.flatMap((item: any) => filterList(item.id));
    };

    res.json({
      content: getSimilarDocuments(
        id,
        calcSimilarities(createVectorsFromDocs(formattedList))
      ),
    });
  } catch {
    res.status(500).json({ message: 'Error' });
  }
}
