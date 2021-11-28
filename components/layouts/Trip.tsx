import TripHeader from '../containers/TripHeader';
import Button from '../units/Button/Button';
import Image from 'next/image';
import { MdImage, MdNavigation } from 'react-icons/md';
import { Trip } from '../../logic/Types/trip';
import { useState } from 'react';
import Recommended from '../containers/Recommended';
type TripLayout = {
  trip: Trip;
};

const Trip = ({ trip }: TripLayout) => {
  const [currentDay, setCurrentDay] = useState(0);

  const getCurrentDayTrip = () => {
    return trip.trip[currentDay];
  };

  return (
    <>
      <div className="container">
        <TripHeader trip={trip} />
        <div className="mx-4 my-4">
          <Button type="plane" size="noSize">
            <>
              <div className="flex justify-between items-center text-lg ">
                <h2 className="text-white font-semibold mb-1">Description</h2>
              </div>
              <p className="text-left text-grey">{trip.desc}</p>
            </>
          </Button>
        </div>
        <div className="py-4 pb-6">
          <h2 className="text-xl text-white font-bold mx-4">Attractions</h2>
          <div className="ml-4 flex gap-4 flex-nowrap overflow-x-auto py-4">
            {trip.trip.map((_, index) => (
              <Button
                key={index}
                size="wide"
                className="flex-shrink-0"
                onClick={() => setCurrentDay(index)}
              >
                {`Day ${index + 1}`}
              </Button>
            ))}
          </div>
          <ul className="mx-4">
            {getCurrentDayTrip().places.map((place, index) => (
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
        </div>
        <Recommended id={trip.id} />
        <div className="px-4 fixed bottom-2 flex right-0">
          <Button
            className="flex-1 flex justify-center h-12 items-center "
            size="big"
            href={getCurrentDayTrip().gmapsUrl}
            iconPosition="right"
            icon={
              <MdNavigation className="w-6 h-6 text-white font-semibold ml-2" />
            }
          >
            <h2 className="text-lg font-semibold">{`Open day ${
              currentDay + 1
            }`}</h2>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Trip;
