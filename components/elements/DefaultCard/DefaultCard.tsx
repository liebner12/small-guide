import Image from 'next/image';
import Button from '../../units/Button/Button';
import Link from '../../units/Link';
import { FaHiking } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Trip } from '../../../logic/Types/trip';
import styles from './Card.module.scss';

type DefaultCard = {
  trip: Trip;
};

const DefaultCard = ({ trip }: DefaultCard) => {
  return (
    <motion.div className="w-full h-44 flex-shrink-0 relative">
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
