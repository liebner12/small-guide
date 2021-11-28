import Image from 'next/image';
import Link from '../../units/Link';
import styles from './Card.module.scss';

interface Props {
  text: string;
  imageSrc: string | StaticImageData;
  to: string;
}

const ShortCard = ({ text, imageSrc, to }: Props) => (
  <div className="relative w-full rounded-lg overflow-hidden">
    <Link to={to} className={styles.card}>
      <h3 className="absolute z-10 top-1/2 transform -translate-y-1/2 right-5 text-white text-base font-semibold">
        {text}
      </h3>
      <div className="w-full h-14 relative scale-75">
        <Image
          src={imageSrc}
          alt={text}
          layout="fill"
          className="scale-75"
          objectFit="cover"
        />
      </div>
    </Link>
  </div>
);

export default ShortCard;
