import { AnimatePresence, motion, PanInfo, useAnimation } from 'framer-motion';
import { MdDeleteForever, MdOutlineAdd } from 'react-icons/md';
import Button from '../units/Button/Button';
import Dropdown from '../units/Dropdown';
import Image from 'next/image';
import { RiFileList3Fill } from 'react-icons/ri';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Place, FullTrip } from '../../logic/Types/createTrip';
import { MdImage } from 'react-icons/md';
import { Reorder } from 'framer-motion';
import ConfirmModal from '../elements/ConfirmModal';

type Slider = {
  setTrip: Function;
  setPlaces: Dispatch<SetStateAction<Array<Place>>>;
  places: Array<Place>;
  trip: FullTrip;
  setCurrentDay: Function;
  currentDay: number;
  getCurrentPlaces: Function;
  handleDefaultData: Function;
};

const Slider = ({
  setTrip,
  trip,
  places,
  setPlaces,
  setCurrentDay,
  handleDefaultData,
  currentDay,
}: Slider) => {
  const [onTop, setOnTop] = useState(false);
  const controls = useAnimation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  function onDragEnd(_: any, info: PanInfo) {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start('hidden');
      setOnTop(false);
    } else {
      controls.start('visible');
      setOnTop(true);
    }
  }

  const handleAddDay = () => {
    setTrip([...trip, { value: trip.length, places: [] }]);
    setCurrentDay(trip.length);
  };

  const remove = (id: number) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  useEffect(() => {
    if (!onTop) {
      controls.start('hidden');
    } else if (onTop) {
      controls.start('visible');
    }
  }, [controls, onTop]);

  const deleteTripDay = (id: number) => {
    const filteredTrip = trip.filter((day) => day.value !== id);
    return filteredTrip.map((day, index) => {
      return { ...day, value: index };
    });
  };

  const onDeleteDay = (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const finishOnDelete = () => {
    setCurrentDay(selectedId - 1);
    setTrip(deleteTripDay(selectedId));
    setOpenModal(false);
  };

  return (
    <>
      <div className="relative w-full">
        <motion.div
          drag="y"
          onDragEnd={onDragEnd}
          initial="hidden"
          animate={controls}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400,
          }}
          variants={{
            visible: { y: '-75%' },
            hidden: { y: 0 },
          }}
          dragElastic={0.2}
          className={`h-screen w-full flex flex-col absolute bg-dark rounded-t-xl z-40`}
        >
          <div className="h-1 bg-grey w-1/2 mt-2 rounded-full m-auto" />
          <div className="flex items-center mx-4 mt-3 justify-between">
            <Dropdown
              items={trip}
              setValue={setCurrentDay}
              value={currentDay}
              onDelete={onDeleteDay}
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
          <div className="mt-4 flex-1 flex overflow-y-hidden">
            <Reorder.Group
              axis="y"
              onReorder={setPlaces}
              values={places}
              className="w-full relative"
            >
              <AnimatePresence>
                {places.map((placeItem: Place) => (
                  <Reorder.Item
                    value={placeItem}
                    id={placeItem.id.toString()}
                    key={placeItem.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      x: 100,
                      transition: { duration: 0.3 },
                      backgroundColor: '#ff3333',
                    }}
                    whileDrag={{ backgroundColor: '#1A4150' }}
                    className="flex items-center w-full px-4 my-2 py-2 rounded-xl"
                  >
                    <motion.div
                      className="flex items-center w-full"
                      layout="position"
                      onClick={() => handleDefaultData(placeItem.id)}
                    >
                      <motion.div
                        layout
                        className="mr-4 flex-shrink-0 flex items-center"
                      >
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
                      </motion.div>
                      <div className="w-full">
                        <h3 className="font-semibold text-white">
                          {placeItem.title}
                        </h3>
                        <p className="text-whiteGrey">{placeItem.desc}</p>
                      </div>
                    </motion.div>
                    <motion.div className="ml-auto" layout>
                      <Button
                        type="iconClean"
                        onClick={() => remove(placeItem.id)}
                        icon={
                          <MdDeleteForever className="ml-4 w-8 h-8 p-1 rounded-lg bg-secondaryDark text-red-500" />
                        }
                      ></Button>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
              {places.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 500 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75 },
                  }}
                  exit={{
                    opacity: 0,
                    x: 100,
                    transition: { duration: 0.75 },
                    backgroundColor: '#ff3333',
                  }}
                  className="text-white flex items-start justify-center w-full my-2"
                >
                  <div className="flex flex-col items-center text-xl font-semibold">
                    <RiFileList3Fill className="h-10 w-10 mb-2" />
                    <h2>List is empty</h2>
                  </div>
                </motion.div>
              )}
            </Reorder.Group>
          </div>
        </motion.div>
      </div>
      {openModal && (
        <ConfirmModal
          setVisible={setOpenModal}
          onFinish={() => finishOnDelete()}
          text="Do you want to delete this day with all atractions?"
        />
      )}
    </>
  );
};

export default Slider;
