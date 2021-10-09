import Image from 'next/image';
import Link from '../elements/Link';

interface Props {
  text: string;
  imageSrc: string | StaticImageData;
  to: string;
}

const ShortCard = ({ text, imageSrc, to }: Props) => (
  <Link to={to}>
    <div className="relative w-full">
      <h4 className="absolute z-10 top-1/2 transform -translate-y-1/2 right-4">
        {text}
      </h4>
      <div className="w-full h-16 w-16">
        <Image src={imageSrc} alt={text} layout="fill" objectFit="cover" />
      </div>
    </div>
  </Link>
);

export default ShortCard;
