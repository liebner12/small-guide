import ItemHeader from '../elements/ItemHeader';
import Button from '../units/Button/Button';
import { FaHiking } from 'react-icons/fa';
import { Trip } from '../../logic/Types/trip';
import { arrayUnion, doc, updateDoc, arrayRemove } from '@firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { pushSaved, removeSaved } from '../../logic/redux/user';
import { RootState } from '../../logic/redux/store';
import { useEffect, useState } from 'react';

type TripHeader = {
  trip: Trip;
};

const TripHeader = ({ trip }: TripHeader) => {
  const { data: session } = useSession();
  const trips = useSelector((state: RootState) => state.user);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    const isFavorite = () => {
      return trips?.trips?.some((item) => item.id === trip.id);
    };
    setActive(isFavorite());
  }, [trips.trips]);

  const dispatch = useDispatch();
  const handleToFavorites = () => {
    if (session?.user) {
      if (!isActive) {
        dispatch(pushSaved(trip));
        updateDoc(doc(db, `users/${(session.user as any).uid}`), {
          trip: arrayUnion(trip),
        });
        updateDoc(doc(db, `trips/${trip.id}`), {
          saved: trip.saved + 1,
        });
      } else {
        dispatch(removeSaved(trip.id));
        updateDoc(doc(db, `users/${(session.user as any).uid}`), {
          trip: arrayRemove(trip),
        });
        updateDoc(doc(db, `trips/${trip.id}`), {
          saved: trip.saved - 1,
        });
      }
    }
  };

  return (
    <>
      <ItemHeader
        authorId={trip.author}
        imageSrc={trip.image}
        text={trip.name}
        id={trip.id}
        handleToFavorites={handleToFavorites}
        isActive={isActive}
      />
      <div className="mt-3 mx-4 ">
        <div className="flex justify-between  items-center w-full">
          <h1 className="font-bold text-white text-2xl">{trip.name}</h1>
          <Button>{trip.place}</Button>
        </div>
        <div className="flex w-full justify-between">
          <h2 className="flex items-center text-grey">
            <FaHiking className="mr-2 inline-block" /> {trip.userName}
          </h2>
          <div className="flex items-center my-2">
            <p className="   text-grey">
              Duration:{' '}
              <span className="font-bold text-white">
                {trip.trip.length} days
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripHeader;
