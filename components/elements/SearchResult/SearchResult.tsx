import Image from 'next/image';
import { FaHiking } from 'react-icons/fa';
import Button from '../../units/Button/Button';
import Link from '../../units/Link';
import styles from './Card.module.scss';

const SearchResult = ({ hit }: any) => {
  return (
    <div className="relative mb-4">
      <Link to={`/trip/${hit.objectID}`} className={styles.card}>
        <div className="w-full h-28 relative rounded-xl overflow-hidden">
          <Image
            src={hit.image}
            alt={hit.name}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={hit.image}
          />
          <div className="text-white text-base mt-2 absolute z-10 w-full px-2 bottom-2">
            <h2 className="text-2xl font-bold">{hit.name}</h2>
            <p className="flex items-center text-whiteGrey text-lg">
              <FaHiking className="mr-1" />
              <span>{hit.userName}</span>
            </p>
          </div>
          <Button className="absolute top-2 right-2 z-10">{hit.place}</Button>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
