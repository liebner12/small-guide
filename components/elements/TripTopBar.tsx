import { FiSearch } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';
import Button from '../units/Button/Button';
import { useCallback, useEffect, useRef } from 'react';
import { GoogleMaps } from '../../logic/Types/createTrip';
import useComponenFocus from '../../logic/hooks/useComponentFocus';

type Props = {
  maps: GoogleMaps;
  setOpenModal: Function;
  isValid: Function;
  onFinish: Function;
};

const TripTopBar = ({ maps, setOpenModal, isValid, onFinish }: Props) => {
  return (
    <>
      <div className="absolute top-2 w-full left-0 z-10 flex items-center">
        <Button
          size="round"
          onClick={() => setOpenModal(true)}
          icon={<MdArrowBack className="h-6 w-10 text-white" />}
          type="iconClean"
          className="mx-1 bg-primary self-stretch"
        ></Button>
        <SearchBox maps={maps} />
        <Button
          size="wide"
          className="mx-1 self-stretch"
          onClick={() => isValid() && onFinish()}
          disabled={!isValid()}
        >
          Finish
        </Button>
      </div>
    </>
  );
};

export default TripTopBar;

type GoogleMapsSearchBox = {
  maps: GoogleMaps;
};

const SearchBox = ({ maps }: GoogleMapsSearchBox) => {
  const { ref } = useComponenFocus(false);
  const searchBox = useRef<any>(null);

  const onPlacesChanged = () => {
    const selected = searchBox.current.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    if (place.geometry.viewport) {
      maps.mapInstance.fitBounds(place.geometry.viewport);
    } else {
      maps.mapInstance.setCenter(place.geometry.location);
      maps.mapInstance.setZoom(17);
    }

    ref.current.blur();
  };

  const handleOnPlacesChanged = useCallback(() => {
    if (onPlacesChanged) {
      onPlacesChanged();
    }
  }, [onPlacesChanged, searchBox]);

  useEffect(() => {
    if (!searchBox.current && maps.mapApi) {
      searchBox.current = new maps.mapApi.places.SearchBox(ref.current);
      searchBox.current.addListener('places_changed', handleOnPlacesChanged);
    }

    return () => {
      if (maps.mapApi) {
        searchBox.current = null;
        maps.mapApi.event.clearInstanceListeners(searchBox);
      }
    };
  }, [maps.mapApi]);

  return (
    <div className="flex items-center bg-dark rounded-full px-4 w-full">
      <FiSearch className="text-white h-5 w-5" />
      <input
        ref={ref}
        placeholder="Search for place..."
        className="w-full transition-all h-10 placeholder-whiteGrey::placeholder rounded-full text-white outline-none py-1.5  px-2 bg-dark"
      />
    </div>
  );
};
