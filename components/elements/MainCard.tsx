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
              <span>{trip.trip.length} days</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MainCard;
