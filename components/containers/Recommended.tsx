import useSWR from 'swr';
import MainCard from '../elements/MainCard';
import { Trip } from '../../logic/Types/trip';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Recommended = {
  id: string;
};

const Recommended = ({ id }: Recommended) => {
  const { data, error } = useSWR(`/api/recommend/${id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="mx-4 mb-16">
      <h2 className="text-white text-base font-semibold mb-2">
        Recommended for You
      </h2>
      <div className="flex flex-nowrap overflow-x-auto gap-8 pb-2 pr-4">
        {data?.content.map((trip: Trip) => (
          <MainCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
