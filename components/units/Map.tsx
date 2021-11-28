import React from 'react';
import Image from 'next/image';

const SimpleMap = () => {
  return (
    <div className="flex my-6">
      <div className="h-24 mx-4">
        <Image
          width="375"
          height="100"
          objectFit="cover"
          className="rounded-lg"
          src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyAQ_5FkrHtSsreJpjKtRzrCWx1hP4x59cg"
        />
      </div>
    </div>
  );
};

export default SimpleMap;
