import MainCard from '../elements/MainCard';
import { ArrayTrips } from '../../logic/Types/trip';
import { useSelector } from 'react-redux';
import { RootState } from '../../logic/redux/store';

type CategoryTrips = {
  trips: ArrayTrips;
  title: string;
};

const CategoryTrips = ({ trips, title }: CategoryTrips) => {
  const { loading } = useSelector((state: RootState) => state.isLoading);
  return (
    <>
      {(loading || trips.length !== 0) && (
        <div>
          <h2 className="text-white text-base font-semibold mb-2 flex items-center mr-4 ml-4">
            {title}
          </h2>

          <div className="flex flex-nowrap overflow-x-auto gap-8 pb-2 pr-4 pl-4">
            {trips.length === 0 &&
              [1, 2, 3].map((index) => (
                <div className="animate-pulse" key={index}>
                  <div className="h-28 w-48 flex px-4 py-4 bg-secondaryDark rounded-xl relative">
                    <div className="h-4 w-20 absolute bottom-2 bg-gray-100 rounded-full right-2"></div>
                  </div>
                  <div className="space-y-3 mt-3">
                    <div className="h-4 w-8/12 bg-gray-100 rounded-full mt-auto" />
                    <div className="h-2 w-6/12 bg-gray-100 rounded-full mt-auto" />
                  </div>
                </div>
              ))}

            {trips.map((trip, index) => (
              <MainCard key={trip.id + index} trip={trip} layoutId={trip.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTrips;
