import { useRouter } from 'next/router';
import TripLayout from '../../components/layouts/Trip';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../logic/redux/store';
import { useEffect, useState } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase';
import { Trip } from '../../logic/Types/trip';

const Trip: NextPage = () => {
  const router = useRouter();
  const [fetchedTrip, setFetchedTrip] = useState<Trip>();
  const { trip } = router.query;
  const selectedTrip = useSelector((state: RootState) => state.trip).filter(
    (item) => item.id === trip
  )[0];

  const fetchTrip = async () => {
    const docRef = doc(db, 'trips', `${trip}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFetchedTrip(docSnap.data() as Trip);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!selectedTrip) {
      fetchTrip();
    }
  }, [router.isReady]);

  return (
    <>
      {selectedTrip ? (
        <TripLayout trip={selectedTrip} />
      ) : (
        fetchedTrip && <TripLayout trip={fetchedTrip} />
      )}
    </>
  );
};

export default Trip;
