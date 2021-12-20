import { NextApiRequest, NextApiResponse } from 'next';
import natural from 'natural';
import { collection, getDocs, query, limit } from '@firebase/firestore';
import { db } from '../../../firebase';
import { ArrayTrips, Trip } from '../../../logic/Types/trip';

const Vector = require('vector-object');
const { TfIdf } = natural;

const formatTrip = (trip: Trip) => {
  const formatted = (
    trip.name +
    ' ' +
    trip.desc +
    ' ' +
    trip.tags.join(' ').repeat(4) +
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
    const createVectors = (processedDocs: any) => {
      const tfidf = new TfIdf();

      processedDocs.forEach((processedDocument: any) => {
        tfidf.addDocument(processedDocument.content);
      });

      const documentVectors = processedDocs.map((doc: any, index: number) => {
        const items = tfidf.listTerms(index);
        const termsObject: any = {};
        items.forEach((term) => {
          termsObject[term.term] = term.tfidf;
        });
        return {
          id: doc.id,
          vector: new Vector(termsObject),
        };
      });

      return documentVectors;
    };

    const calcSimilarities = (documents: any) => {
      const result: any = {};
      documents.forEach((vector: any) => {
        result[vector.id] = [];
      });

      documents.forEach((vec: any, index: number) => {
        for (let j = 0; j < index; j += 1) {
          const similarity = vec.vector.getCosineSimilarity(
            documents[j].vector
          );
          if (similarity > 0.1) {
            result[vec.id].push({
              id: documents[j].id,
              similarity: similarity,
            });
            result[documents[j].id].push({
              id: vec.id,
              similarity: similarity,
            });
          }
        }
      });

      return result;
    };

    const filterList = (id: string) => {
      return inputList.filter((item: Trip) => item.id === id);
    };

    const getSimilarDocuments = (id: any, docs: any) => {
      const similarDocuments = docs[id].sort(
        (a: any, b: any) => b.similarity - a.similarity
      );

      if (similarDocuments) {
        return similarDocuments.flatMap((item: any) => filterList(item.id));
      }

      return [];
    };

    res.json({
      content: getSimilarDocuments(
        id,
        calcSimilarities(createVectors(formattedList))
      ),
    });
  } catch {
    res.status(500).json({ message: 'Error' });
  }
}
