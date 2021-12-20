import { AnimatePresence, motion, PanInfo, useAnimation } from 'framer-motion';
import { MdOutlineAdd } from 'react-icons/md';
import Button from '../units/Button/Button';
import Dropdown from '../units/Dropdown';
import { RiFileList3Fill } from 'react-icons/ri';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Place, FullTrip } from '../../logic/Types/createTrip';
import { Reorder } from 'framer-motion';
import ConfirmModal from '../elements/ConfirmModal';
import SliderItem from '../elements/SliderItem';

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
                  <SliderItem
                    key={placeItem.id}
                    placeItem={placeItem}
                    remove={remove}
                    handleDefaultData={handleDefaultData}
                  />
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
