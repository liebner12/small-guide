import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import Button from '../../components/units/Button/Button';
import TextField from '../../components/units/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { place } from '../../logic/redux/createTrip';
import BackButton from '../../components/elements/BackButton';
import ImagePicker from '../../components/elements/ImagePicker';
import router from 'next/router';
import { RootState } from '../../logic/redux/store';

const CreatePlace: NextPage = () => {
  const dispatch = useDispatch();
  const tripSelected = useSelector(
    (state: RootState) => state.tripCreate.place
  );
  const [selectedImage, setSelectedImage] = useState(tripSelected.image);
  const [placeName, setPlaceName] = useState(tripSelected.place);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const isValid = () => {
    return placeName.length > 2 && selectedImage !== '';
  };

  const handleConfirm = () => {
    if (isValid()) {
      dispatch(place({ place: placeName, image: selectedImage }));
      router.push('/create/main');
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <BackButton className="ml-4 mt-4" />
        <div className="mt-16 mx-4 pb-4 h-full flex flex-col">
          <h1 className="text-white font-bold text-3xl">Step 2</h1>
          <p className="text-grey mt-2 text-lg">
            Fill in name and add main trip image
          </p>
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
              label="Place location (city):"
              containerClassName="my-2"
            />
          </div>
          <Button
            size="big"
            className="mt-8 h-12 w-full"
            onClick={() => handleConfirm()}
            disabled={!isValid()}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePlace;
