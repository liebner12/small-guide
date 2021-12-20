import React, { useEffect, useState } from 'react';
import BackButton from '../elements/BackButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../logic/redux/store';
import { useSession } from 'next-auth/react';
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';
import CreatedTrips from '../containers/CreatedTrips';

export default function Profile() {
  const [trips, setTrips] = useState([]);
  const createdTrips = useSelector(
    (state: RootState) => state.user.createdTrips
  );
  const { data: session } = useSession();
  const fetchTrips = async () => {
    const q = query(
      collection(db, 'trips'),
      where(documentId(), 'in', createdTrips)
    );
    const documents: any = [];
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      documents.push({
        ...doc.data(),
        id: doc.id,
        timeStamp: doc.data().timeStamp.toDate().toDateString(),
      });
    });

    setTrips(documents);
  };

  useEffect(() => {
    if (createdTrips.length > 0) fetchTrips();
  }, []);

  return (
    <div className="mx-4 py-4 h-screen flex flex-col">
      <BackButton to="/" />
      <div className="flex flex-col items-center mt-8">
        {session?.user?.image && (
          <div className="relative">
            <Image
              src={session?.user?.image}
              height={100}
              width={100}
              className="rounded-full"
            />
          </div>
        )}
        <h1 className="text-white font-bold text-2xl mt-4">
          {session?.user?.name}
        </h1>
        <h1 className="text-grey font-semibold">{session?.user?.email}</h1>
      </div>
      <div className="mt-8">
        <CreatedTrips trips={trips} setTrips={setTrips} />
      </div>
    </div>
  );
}
