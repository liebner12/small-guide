import BackButton from '../../components/elements/BackButton';
import Image from 'next/image';
import logo from '../../assets/icons/logo512x512.svg';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <div
      className="mx-4 h-screen py-4 flex flex-col"
      style={{ height: height }}
    >
      <BackButton />
      <div className="mt-20 flex justify-center">
        <Image src={logo} height="120px" width="120px" />
      </div>
      <h1 className="text-3xl font-bold text-white self-center mt-2">
        Small guide
      </h1>
    </div>
  );
};

export default SignIn;
