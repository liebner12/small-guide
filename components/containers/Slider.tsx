import { motion, PanInfo, useAnimation } from 'framer-motion';
import { MdOutlineAdd } from 'react-icons/md';
import Button from '../units/Button/Button';
import Dropdown from '../units/Dropdown';
import Image from 'next/image';
import { RiFileList3Fill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { Place, FullTrip } from '../../logic/Types/createTrip';
import { MdImage } from 'react-icons/md';

type Slider = {
  setTrip: Function;
  trip: FullTrip;
  setCurrentDay: Function;
  currentDay: number;
  getCurrentPlaces: Function;
};

const Slider = ({
  setTrip,
  trip,
  setCurrentDay,
  currentDay,
  getCurrentPlaces,
}: Slider) => {
  const controls = useAnimation();
  const [onTop, setOnTop] = useState(false);
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let touchstartY = 0;
    let touchendY = 0;

    function handleGesture() {
      if (touchendY + 50 < touchstartY) setOnTop(true);
      if (touchendY + 50 > touchstartY) setOnTop(false);
    }

    function listenerStart(e: any) {
      touchstartY = e.changedTouches[0].screenY;
    }

    function listenerEnd(e: any) {
      touchendY = e.changedTouches[0].screenY;
      handleGesture();
    }

    slider.current?.addEventListener('touchstart', listenerStart);

    slider.current?.addEventListener('touchend', listenerEnd);

    return () => {
      slider.current?.removeEventListener('touchstart', listenerStart);
      slider.current?.removeEventListener('touchend', listenerEnd);
    };
  }, []);

  const handleAddDay = () => {
    setTrip([...trip, { value: trip.length, places: [] }]);
    setCurrentDay(trip.length);
  };

  async function handleDragEnd(_: any, info: PanInfo, placeId: number) {
    const offset = info.offset.x - info.delta.x;
    const velocity = info.velocity.x;
    if (Math.abs(offset) > 100 || velocity < -500) {
      await controls.start({
        x: offset < 0 ? '-100%' : '100%',
        transition: { duration: 0.5 },
      });
      setTrip(
        trip.map((el) =>
          el.value === currentDay
            ? {
                ...el,
                places: el.places.filter(
                  (place: Place) => place.id !== placeId
                ),
              }
            : el
        )
      );
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  }
  return (
    <div
      ref={slider}
      className={`h-screen w-full flex flex-col absolute bg-dark ${
        onTop ? 'top-0' : 'top-3/4'
      } transition-all duration-300 z-40`}
    >
      <div className="h-1 bg-grey w-1/2 mt-2 rounded-full m-auto" />
      <div className="flex items-center mx-4 mt-3 justify-between">
        <Dropdown
          items={trip}
          setValue={setCurrentDay}
          value={currentDay}
          days
        />
        {trip.length < 14 && (
          <Button
            size="wide"
            icon={<MdOutlineAdd className="h-8 w-6" />}
            onClick={() => handleAddDay()}
          >
            Add Day
          </Button>
        )}
      </div>
      <div className="mt-4 flex-1 flex-shrink-0 flex overflow-y-auto ">
        {getCurrentPlaces().length > 0 ? (
          <ul className="w-full">
            {getCurrentPlaces().map((placeItem: Place) => (
              <motion.div
                drag="x"
                dragDirectionLock
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, placeItem.id)
                }
                key={placeItem.id}
                animate={controls}
                className="flex items-center pb-1 w-full bg-dark px-4 rounded-lg my-4"
              >
                <div className="mr-4 flex-shrink-0 flex items-center">
                  {placeItem.img ? (
                    <Image
                      src={placeItem.img}
                      width="64"
                      height="64"
                      className="rounded-lg"
                    />
                  ) : (
                    <MdImage
                      className="text-white w-16 h-16"
                      viewBox="3 3 18 18"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {placeItem.title}
                  </h3>
                  <p className="text-whiteGrey break-all">{placeItem.desc}</p>
                </div>
              </motion.div>
            ))}
          </ul>
        ) : (
          <div className="text-white flex items-start justify-center w-full my-2">
            <div className="flex flex-col items-center text-xl font-semibold">
              <RiFileList3Fill className="h-10 w-10 mb-2" />
              <h2>List is empty</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
