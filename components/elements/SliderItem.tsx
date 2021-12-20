import { motion, Reorder } from 'framer-motion';
import Image from 'next/image';
import { MdDeleteForever, MdImage } from 'react-icons/md';
import { Place } from '../../logic/Types/createTrip';
import Button from '../units/Button/Button';

type SliderItem = {
  placeItem: Place;
  remove: Function;
  handleDefaultData: Function;
};

const SliderItem = ({ placeItem, remove, handleDefaultData }: SliderItem) => {
  return (
    <Reorder.Item
      value={placeItem}
      id={placeItem.id.toString()}
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
        <motion.div layout className="mr-4 flex-shrink-0 flex items-center">
          {placeItem.img ? (
            <Image
              src={placeItem.img}
              width="64"
              height="64"
              className="rounded-lg"
            />
          ) : (
            <MdImage className="text-white w-16 h-16" viewBox="3 3 18 18" />
          )}
        </motion.div>
        <div className="w-full">
          <h3 className="font-semibold text-white">{placeItem.title}</h3>
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
  );
};

export default SliderItem;
