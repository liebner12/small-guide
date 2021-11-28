import { FaMapMarkerAlt } from 'react-icons/fa';
import { Place } from '../../logic/Types/createTrip';

interface Maker {
  lat: number;
  lng: number;
  place: Place;
  color: number;
}

const Marker = ({ place, color }: Maker) => {
  const colors = [
    'text-indigo-500',
    'text-primary',
    'text-amber-500',
    'text-blue-500',
    'text-cyan-500',
    'text-emelard-500',
    'text-fuchsia-500',
    'text-green-500',
    'text-lime-500',
    'text-orange-500',
    'text-pink-500',
    'text-purple-500',
    'text-red-500',
    'text-violet-500',
  ];
  return (
    <div
      className={`transform -translate-y-1/2 -translate-x-1/2 ${colors[color]} absolute`}
    >
      <h2 className="text-xl mr-1 font-bold absolute top-1/2 transform -translate-y-1/2 ml-9">
        {place.title}
      </h2>
      <FaMapMarkerAlt className="h-8 w-8 text-4xl flex-shrink-0" />
    </div>
  );
};

export default Marker;
