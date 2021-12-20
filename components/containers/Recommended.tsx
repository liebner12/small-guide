import useSWR from 'swr';
import MainCard from '../elements/MainCard';
import { Trip } from '../../logic/Types/trip';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Recommended = {
  id: string;
};

const Recommended = ({ id }: Recommended) => {
  const { data, error } = useSWR(`/api/recommend/${id}`, fetcher);

  if (error) return <></>;
  if (!data)
    return (
      <div className="animate-pulse mx-4 mb-16">
        <div className="h-4 w-8/12 bg-gray-100 rounded-full mb-5" />
        <div className="flex flex-nowrap overflow-x-auto gap-8 pb-2 pr-4">
          {[1, 2, 3].map((index) => (
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
        </div>
      </div>
    );

  return (
    <>
      {data.content.length > 0 && (
        <div className="mx-4 mb-16">
          <h2 className="text-white text-base font-semibold mb-2">
            Recommended for You
          </h2>
          <div className="flex flex-nowrap overflow-x-auto gap-8 pb-2 pr-4">
            {data.content.map((trip: Trip) => (
              <MainCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Recommended;
