import { HiOutlineX } from 'react-icons/hi';
import Button from '../units/Button/Button';
import TextField from '../units/TextField';
import { useEffect, useState, useRef } from 'react';
import { Place } from '../../logic/Types/createTrip';
import ImagePicker from './ImagePicker';
import InfoWindow from '../units/InfoWindow';

type PlaceModal = {
  place: Place;
  places: Array<Place>;
  setPlace: Function;
  setPlaces: Function;
  setVisible: Function;
  edit: number;
};

const PlaceModal = ({
  place,
  places,
  setPlace,
  setPlaces,
  setVisible,
  edit,
}: PlaceModal) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [updateTable, setUpdateTable] = useState(false);
  const [infoWindow, setInfoWindow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const filePickerRef = useRef<HTMLInputElement>(null);
  const isValid = () => {
    return name && desc;
  };

  const handleOnClick = () => {
    if (isEdit()) {
      setPlace({
        ...selectedDay(edit),
        title: name,
        desc: desc,
        img: selectedImage,
      });
    } else {
      setPlace({
        ...place,
        id: Date.now(),
        title: name,
        desc: desc,
        img: selectedImage,
      });
    }

    setUpdateTable(true);
  };

  const isEdit = () => {
    return edit !== 0;
  };

  useEffect(() => {
    if (isEdit()) {
      const place = places.find((place) => place.id === edit);
      if (place) {
        setName(place.title);
        setDesc(place.desc);
        setSelectedImage(place.img);
      }
    }
  }, []);

  const selectedDay = (edit: number) => {
    return places.find((place) => place.id === edit);
  };

  const changePlaces = () => {
    return isEdit()
      ? places.map((item) => (item.id === edit ? place : item))
      : [...places, place];
  };

  useEffect(() => {
    if (updateTable) {
      setPlaces(changePlaces());
      setVisible();
    }
    setUpdateTable(false);
  }, [updateTable]);

  return (
    <>
      <div
        className="w-full h-full absolute top-0 left-0 z-50 grid place-items-center bg-blackOpacity"
        onClick={() => setVisible()}
      />
      <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 bg-secondaryDark rounded-lg">
        <Button
          icon={<HiOutlineX />}
          type="iconClean"
          className="text-2xl ml-auto text-white absolute right-2 top-2"
          onClick={() => setVisible()}
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
            <div className="ml-auto">
              <Button
                size="wide"
                className="mt-6 text-lg self-end w-24"
                onClick={() => isValid() && handleOnClick()}
                disabled={!isValid()}
                onHover={() => (!isValid() ? setInfoWindow(true) : null)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <InfoWindow
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        text="Please fill at least name and description of attraction."
      />
    </>
  );
};

export default PlaceModal;
