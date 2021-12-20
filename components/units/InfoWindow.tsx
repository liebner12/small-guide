import { useEffect } from 'react';

type InfoWindow = {
  infoWindow: boolean;
  setInfoWindow: Function;
  text: string;
};

const InfoWindow = ({ infoWindow, setInfoWindow, text }: InfoWindow) => {
  useEffect(() => {
    if (infoWindow)
      setTimeout(() => {
        setInfoWindow(false);
      }, 4000);
  }, [infoWindow]);
  return (
    <>
      {infoWindow && (
        <div className="absolute bottom-4 left-0 w-full flex justify-center items-center z-50">
          <div className="bg-red-500 mx-4 px-4 py-1 rounded-full">
            <h4 className="text-center font-semibold text-white">{text}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoWindow;
