import Image from 'next/image';
import Button from '../../units/Button/Button';
import Link from '../../units/Link';
import { FaHiking } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Trip } from '../../../logic/Types/trip';
import styles from './Card.module.scss';

type DefaultCard = {
  trip: Trip;
  layoutId?: string;
};

const DefaultCard = ({ trip, layoutId }: DefaultCard) => {
  if (!trip) {
    return (
      <div className="animate-pulse h-44 flex px-4 py-4 w-full bg-secondaryDark rounded-xl">
        <div className="h-full w-full flex flex-col">
          <div className="h-4 w-20 bg-gray-100 rounded-full ml-auto"></div>

          <div className="space-y-4 mt-auto">
            <div className="h-5 w-9/12 bg-gray-100 rounded-full mt-auto" />
            <div className="h-3 w-7/12 bg-gray-100 rounded-full mt-auto" />
            <div className="h-2 w-4/12 bg-gray-100 rounded-full mt-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-44 flex-shrink-0 relative"
      layoutId={layoutId}
      initial={false}
    >
      <Link to={`/trip/${trip.id}`} className={styles.card}>
        <div className="w-full h-44 relative rounded-xl overflow-hidden">
          <Image
            src={trip.image}
            alt={trip.name}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={trip.image}
          />

          <Button className="absolute z-10 top-2 right-2" size="small">
            {trip.place}
          </Button>
          <div className="absolute z-10 bottom-2 left-2 text-white text-base mt-2">
            <h2 className="text-2xl font-bold">{trip.name}</h2>
            <p className="flex items-center font-semibold text-whiteGrey text-lg">
              <FaHiking className="mr-1" />
              <span>{trip.userName}</span>
            </p>
            <div className="flex text-grey">
              <p className="flex items-center">
                Duration:<span className="ml-1">{trip.trip.length} days</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DefaultCard;
