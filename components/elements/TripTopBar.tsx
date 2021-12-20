import { FiSearch } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';
import Button from '../units/Button/Button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMaps } from '../../logic/Types/createTrip';
import useComponenFocus from '../../logic/hooks/useComponentFocus';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { edit, main, place, tripPlan } from '../../logic/redux/createTrip';
import InfoWindow from '../units/InfoWindow';
import { emptyTrip } from '../../logic/constants';

type Props = {
  maps: GoogleMaps;
  setOpenModal: Function;
  isValid: Function;
  onFinish: Function;
  openModal: Boolean;
};

const TripTopBar = ({
  maps,
  setOpenModal,
  isValid,
  onFinish,
  openModal,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clearStore = () => {
    dispatch(tripPlan([{ value: 0, places: [], gmapsUrl: '' }]));
    dispatch(place({ place: '', image: '' }));
    dispatch(main({ name: '', desc: '', tags: [], category: 'City' }));
    dispatch(edit(emptyTrip));
  };
  const [infoWindow, setInfoWindow] = useState(false);
  useEffect(() => {
    router.beforePopState(() => {
      if (openModal) {
        clearStore();
        return true;
      }
      router.replace('/create');
      window.history.pushState('/', '');
      setOpenModal(true);

      return false;
    });

    return () => {
      router.beforePopState(() => {
        return true;
      });
    };
  }, [openModal]);
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
          className="h-full mx-1"
          onClick={() => isValid() && onFinish()}
          disabled={!isValid()}
          onHover={() => (!isValid() ? setInfoWindow(true) : null)}
        >
          Finish
        </Button>
      </div>
      <InfoWindow
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        text="Data doesn't meet requirements. Please check if all days have at least 3 attractions."
      />
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
