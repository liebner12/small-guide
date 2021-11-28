import MainCard from '../elements/MainCard';
import Link from '../units/Link';
import { IoArrowForward } from 'react-icons/io5';
import { ArrayTrips } from '../../logic/Types/trip';
import Button from '../units/Button/Button';

type CategoryTrips = {
  trips: ArrayTrips;
  title: string;
};

const CategoryTrips = ({ trips, title }: CategoryTrips) => (
  <div className="ml-4">
    <Link to="/">
      <h2 className="text-white text-base font-semibold mb-2 flex items-center justify-between mr-4">
        {title}
        <Button icon={<IoArrowForward />} type="iconClean" />
      </h2>
    </Link>
    <div className="flex flex-nowrap overflow-x-auto gap-8 pb-2 pr-4">
      {trips.map((trip) => (
        <MainCard key={trip.id} trip={trip} layoutId={trip.id} />
      ))}
    </div>
  </div>
);

export default CategoryTrips;
