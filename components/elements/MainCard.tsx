import Image from 'next/image';
import Button from '../units/Button/Button';
import Link from '../units/Link';
import { FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Trip } from '../../logic/Types/trip';

type MainCard = {
  trip: Trip;
  layoutId?: string;
};

const MainCard = ({ trip, layoutId }: MainCard) => {
  if (!trip) {
    return (
      <div className="animate-pulse">
        <div className="h-28 w-48 flex px-4 py-4 bg-secondaryDark rounded-xl relative">
          <div className="h-4 w-20 absolute bottom-2 bg-gray-100 rounded-full right-2"></div>
        </div>
        <div className="space-y-3 mt-3">
          <div className="h-4 w-8/12 bg-gray-100 rounded-full mt-auto" />
          <div className="h-2 w-6/12 bg-gray-100 rounded-full mt-auto" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-48 flex-shrink-0"
      layoutId={layoutId}
      initial={false}
    >
      <Link to={`/trip/${trip.id}`}>
        <div className="w-full h-28 relative rounded-xl overflow-hidden">
          <div>
            <Image
              src={trip.image}
              alt={trip.name}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={trip.image}
            />
          </div>
          <Button className="absolute z-10 bottom-1 right-1" size="small">
            {trip.place}
          </Button>
        </div>
        <div className="text-white text-base mt-2">
          <h3 className="text-lg font-bold leading-5">{trip.name} </h3>
          <div className="flex text-sm mt-2 text-whiteGrey">
            <p className="flex items-center">
              <FaRegClock className="mr-1" />
              <span>{trip?.trip.length} days</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MainCard;
