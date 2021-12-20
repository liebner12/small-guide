import Router from 'next/router';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { place } from '../../logic/redux/createTrip';
import { RootState } from '../../logic/redux/store';
import ImagePicker from '../elements/ImagePicker';
import Button from '../units/Button/Button';
import InfoWindow from '../units/InfoWindow';
import TextField from '../units/TextField';

const PlaceTrip = () => {
  const dispatch = useDispatch();
  const tripSelected = useSelector(
    (state: RootState) => state.tripCreate.place
  );
  const [infoWindow, setInfoWindow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(tripSelected.image);
  const [placeName, setPlaceName] = useState(tripSelected.place);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const isValid = () => {
    return placeName.length > 2 && selectedImage !== '';
  };

  const handleConfirm = () => {
    if (isValid()) {
      dispatch(place({ place: placeName, image: selectedImage }));
      Router.push('/create/main');
    }
  };
  return (
    <>
      <div className="mt-10">
        <div className="flex items-start flex-col">
          <h2 className="text-white text-lg font-semibold mb-2">
            Set main image:
          </h2>
          <ImagePicker
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            className="mb-4 w-full"
            type="wide"
            inputRef={filePickerRef}
          />
          <Button
            size="big"
            className="mb-4 h-10"
            onClick={() =>
              filePickerRef.current && filePickerRef.current.click()
            }
          >
            Select File
          </Button>
        </div>
        <TextField
          setText={setPlaceName}
          text={placeName}
          type="secondary"
          rounded="lg"
          className="h-10"
          label="Place location:"
          containerClassName="my-2"
        />
      </div>
      <div className="mt-8">
        <Button
          size="big"
          className="h-12 w-full"
          onClick={() => handleConfirm()}
          onHover={() => !isValid() && setInfoWindow(true)}
          disabled={!isValid()}
        >
          Confirm
        </Button>
      </div>
      <InfoWindow
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        text="Data doesn't meet requirements. Please upload main image and type in place."
      />
    </>
  );
};

export default PlaceTrip;
