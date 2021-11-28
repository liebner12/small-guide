import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../../components/elements/BackButton';
import DefaultCard from '../../components/elements/DefaultCard/DefaultCard';
import { RootState } from '../../logic/redux/store';

function Saved() {
  const trips = useSelector((state: RootState) => state.user.trips);

  return (
    <div>
      <div className="mx-4 py-4 h-screen flex flex-col">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-2xl font-bold text-white">Saved trips</h1>
        </div>
        <ul className="flex flex-col gap-6 mt-8">
          {trips.map((trip) => (
            <DefaultCard key={trip.id} trip={trip} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Saved;
