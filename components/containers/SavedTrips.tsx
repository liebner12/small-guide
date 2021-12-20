import { FaHeartBroken } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../logic/redux/store';
import DefaultCard from '../elements/DefaultCard/DefaultCard';

const SavedTrips = () => {
  const trips = useSelector((state: RootState) => state.user.trips);
  return (
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
  );
};

export default SavedTrips;
