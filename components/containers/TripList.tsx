import Image from 'next/image';
import { MdImage } from 'react-icons/md';
import { Trip } from '../../logic/Types/createTrip';

type TripLayout = {
  currentDayTrip: Trip;
};

const TripList = ({ currentDayTrip }: TripLayout) => {
  return (
    <ul className="mx-4">
      {currentDayTrip.places.map((place, index) => (
        <li className="flex items-center" key={place.id}>
          <span className="text-whiteGrey font-bold mr-2">{`${
            index + 1
          }.`}</span>
          <div className="mx-2 flex-shrink-0 my-3">
            {place.img ? (
              <Image
                src={place.img}
                width="64"
                height="64"
                className="rounded-lg"
                placeholder="blur"
                blurDataURL={place.img}
              />
            ) : (
              <MdImage
                className="text-white w-16 h-16 rounded-lg"
                viewBox="3 3 18 18"
              />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">{place.title}</h3>
            <p className="text-whiteGrey">{place.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TripList;
