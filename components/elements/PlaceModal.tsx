import { HiOutlineX } from 'react-icons/hi';
import Button from '../units/Button/Button';
import TextField from '../units/TextField';
import { useEffect, useState, useRef } from 'react';
import { Place, Trip } from '../../logic/Types/createTrip';
import ImagePicker from './ImagePicker';
type PlaceModal = {
  place: Place;
  setPlace: Function;
  setTrip: Function;
  trip: Array<Trip>;
  currentDay: number;
  setVisible: Function;
  setDirectionsUrl: Function;
};

const PlaceModal = ({
  place,
  setPlace,
  setTrip,
  trip,
  currentDay,
  setVisible,
  setDirectionsUrl,
}: PlaceModal) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [updateTable, setUpdateTable] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const filePickerRef = useRef<HTMLInputElement>(null);
  const handleOnClick = () => {
    setPlace({
      ...place,
      id: Date.now(),
      title: name,
      desc: desc,
      img: selectedImage,
    });

    setUpdateTable(true);
  };

  useEffect(() => {
    if (updateTable) {
      setTrip(
        trip.map((el) =>
          el.value === currentDay
            ? {
                ...el,
                places: [...el.places, place],
                gmapsUrl: setDirectionsUrl(),
              }
            : el
        )
      );
      setVisible(false);
    }
    setUpdateTable(false);
  }, [updateTable]);

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 z-40 grid place-items-center" />
      <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-40 bg-secondaryDark rounded-lg">
        <Button
          icon={<HiOutlineX />}
          type="iconClean"
          className="text-2xl ml-auto text-white absolute right-2 top-2"
          onClick={() => setVisible(false)}
        />

        <div className="flex px-4 py-6 items-center">
          <ImagePicker
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            className="flex-shrink-0 mr-4"
            inputRef={filePickerRef}
          />
          <div className="w-full flex flex-col">
            <h2 className="text-white font-semibold  mb-1 ml-1">Name:</h2>
            <TextField text={name} setText={setName} rounded="lg" autoFocus />
            <h2 className="text-white font-semibold  mb-1 ml-1 mt-2">
              Description:
            </h2>
            <TextField text={desc} setText={setDesc} rounded="lg" multiline />
            <Button
              size="wide"
              className="mt-6 text-lg self-end w-24"
              onClick={() => handleOnClick()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceModal;
