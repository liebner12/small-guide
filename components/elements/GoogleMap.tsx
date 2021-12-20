import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { FullTrip, Place } from '../../logic/Types/createTrip';
import Marker from '../units/Marker';

type GoogleMap = {
  trip: FullTrip;
  setPlace: Function;
  setVisible: Function;
  setMaps: Function;
  place: Place;
};

const GoogleMap = ({
  trip,
  setPlace,
  setVisible,
  setMaps,
  place,
}: GoogleMap) => {
  const defaultCenter = {
    lat: 51.9194,
    lng: 19.1451,
  };
  const [center, setCenter] = useState(defaultCenter);
  const mapOnClick = async (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    e.stop();
    const placeId = e.placeId ? e.placeId : '';
    setCenter({ lat, lng });
    setPlace({ ...place, cords: { lat, lng }, placeId });
    setVisible(true);
  };

  const apiHasLoaded = (map: any, maps: any) => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCenter({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
    map.addListener('click', (e: any) => mapOnClick(e));
    setMaps({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
  };

  const createMapOptions = () => {
    return {
      gestureHandling: 'greedy',
      disableDefaultUI: true,
      mapId: process.env.MAP_ID,
    };
  };

  return (
    <GoogleMapReact
      onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      yesIWantToUseGoogleMapApiInternals
      center={center}
      options={createMapOptions}
      defaultZoom={13}
      bootstrapURLKeys={{
        key: process.env.GOOGLE_MAPS_KEY as string,
        libraries: ['places'],
      }}
    >
      {trip.map((day, index) =>
        day.places.map((placeItem: Place) => (
          <Marker
            key={placeItem.id}
            lat={placeItem.cords.lat}
            lng={placeItem.cords.lng}
            place={placeItem}
            color={index}
          />
        ))
      )}
    </GoogleMapReact>
  );
};

export default GoogleMap;
