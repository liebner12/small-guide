import { useState } from 'react';
import { TripCategoriesArray } from '../../logic/Types/trip';
import Button from '../units/Button/Button';
import Dropdown from '../units/Dropdown';
import InfoWindow from '../units/InfoWindow';
import TextField from '../units/TextField';

type MainTrip = {
  name: string;
  setName: Function;
  desc: string;
  setDesc: Function;
  setTag: Function;
  tag: string;
  isValid: Function;
  setOpenModal: Function;
  setCategory: Function;
  category: string;
  categories: TripCategoriesArray;
};

const MainTrip = ({
  name,
  setName,
  desc,
  setDesc,
  setTag,
  tag,
  isValid,
  setOpenModal,
  setCategory,
  category,
  categories,
}: MainTrip) => {
  const [infoWindow, setInfoWindow] = useState(false);

  return (
    <>
      <div className="mt-10">
        <TextField
          setText={setName}
          text={name}
          type="secondary"
          rounded="lg"
          className="h-10"
          label="Trip name:"
          containerClassName="my-6"
        />
        <TextField
          setText={setDesc}
          text={desc}
          type="secondary"
          multiline
          rounded="lg"
          className="h-10"
          label="Trip description:"
          containerClassName="my-6"
        />
        <TextField
          setText={setTag}
          text={tag}
          type="secondary"
          rounded="lg"
          className="h-10"
          containerClassName="my-6"
          label="Tags:"
        />
        <Dropdown setValue={setCategory} value={category} items={categories} />
        <Button
          size="big"
          className="mt-8 h-12 w-full"
          onHover={() => !isValid() && setInfoWindow(true)}
          onClick={() => isValid() && setOpenModal(true)}
          disabled={!isValid()}
        >
          Create Trip
        </Button>
        <InfoWindow
          infoWindow={infoWindow}
          setInfoWindow={setInfoWindow}
          text="Data doesn't meet requirements. Please check if all steps
              have been finished."
        />
      </div>
    </>
  );
};

export default MainTrip;
