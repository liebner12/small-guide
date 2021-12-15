import { useSession } from 'next-auth/react';
import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../../components/elements/BackButton';
import DefaultCard from '../../components/elements/DefaultCard/DefaultCard';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import { RootState } from '../../logic/redux/store';
import { FaHeartBroken } from 'react-icons/fa';

function Saved() {
  const trips = useSelector((state: RootState) => state.user.trips);
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <div>
      <div className="mx-4 py-4 h-screen flex flex-col">
        <div className="flex items-center">
          <BackButton to="/" />
          <h1 className="text-2xl font-bold text-white">Saved trips</h1>
        </div>
        <ul className="flex flex-col gap-6 mt-8 min-h-full">
          {trips?.length > 0 ? (
            trips.map((trip) => <DefaultCard key={trip.id} trip={trip} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white font-bold text-2xl">
              <FaHeartBroken className="h-32 w-32 mb-8" />
              <h2>This list is empty</h2>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Saved;
