import { useState } from 'react';
import Slider from '../containers/Slider';
import FinishModal from '../elements/FinishModal';
import PlaceModal from '../elements/PlaceModal';
import TripTopBar from '../elements/TripTopBar';
import { useDispatch, useSelector } from 'react-redux';
import { tripPlan } from '../../logic/redux/createTrip';
import { RootState } from '../../logic/redux/store';
import router from 'next/router';
import GoogleMap from '../elements/GoogleMap';

const CreateTrip = () => {
  const tripSelected = useSelector((state: RootState) => state.tripCreate.trip);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [place, setPlace] = useState({
    id: 0,
    title: '',
    desc: '',
    img: '',
    cords: { lat: 0, lng: 0 },
    placeId: '',
  });
  const [trip, setTrip] = useState(tripSelected);
  const [currentDay, setCurrentDay] = useState(0);
  const [maps, setMaps] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  });
  const [openModal, setOpenModal] = useState(false);

  const getCurrentPlaces = () => {
    return trip.filter((value) => value.value === currentDay)[0].places;
  };

  const setDirectionsUrl = () => {
    const firstPlace = getCurrentPlaces()[0];
    const lastPlace = getCurrentPlaces()[getCurrentPlaces().length - 1];
    const firstPlaceId = firstPlace?.placeId
      ? `&origin_place_id=${firstPlace.placeId}`
      : '';
    const lastPlaceId = lastPlace?.placeId
      ? `&destination_place_id=${lastPlace.placeId}`
      : '';
    let url = `https://www.google.com/maps/dir/?api=1&origin=${firstPlace?.cords.lat},${firstPlace?.cords.lng}${firstPlaceId}&destination=${lastPlace?.cords.lat},${lastPlace?.cords.lng}${lastPlaceId}&waypoints=`;

    getCurrentPlaces()
      .slice(1, -1)
      .forEach((place) => {
        url += `${place.cords.lat},${place.cords.lng}%7C`;
      });

    return url;
  };

  const isValid = () => {
    const lengths = trip.map((place) => place.places.length);
    if (lengths.filter((number) => number < 3).length !== 0) {
      return false;
    }

    return true;
  };

  const onFinish = () => {
    dispatch(tripPlan(trip));
    router.push('/create/place');
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-y-hidden relative">
      {visible && (
        <PlaceModal
          place={place}
          setPlace={setPlace}
          setTrip={setTrip}
          currentDay={currentDay}
          trip={trip}
          setVisible={setVisible}
          setDirectionsUrl={setDirectionsUrl}
        />
      )}
      {maps.mapApiLoaded && (
        <TripTopBar
          maps={maps}
          setOpenModal={setOpenModal}
          isValid={isValid}
          onFinish={onFinish}
        />
      )}
      {openModal && (
        <FinishModal
          setVisible={setOpenModal}
          onFinish={() => router.back()}
          text="Do you want to cancel this trip?"
        />
      )}
      <div className="w-full h-3/4">
        <GoogleMap
          setMaps={setMaps}
          setVisible={setVisible}
          setPlace={setPlace}
          trip={trip}
          place={place}
        />
      </div>
      <Slider
        setTrip={setTrip}
        setCurrentDay={setCurrentDay}
        trip={trip}
        currentDay={currentDay}
        getCurrentPlaces={getCurrentPlaces}
      />
    </div>
  );
};

export default CreateTrip;
