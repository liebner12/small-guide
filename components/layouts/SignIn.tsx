import Image from 'next/image';
import { useEffect, useState } from 'react';
import BackButton from '../elements/BackButton';
import logo from '../../assets/icons/logo512x512.svg';
import SignInContainer from '../containers/SignIn';
import { Providers } from '../../logic/Types/providers';

type SignIn = {
  providers: Providers;
};

const SignIn = ({ providers }: SignIn) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <div
      className="mx-4 h-screen py-4 flex flex-col"
      style={{ height: height }}
    >
      <BackButton to="/" />
      <div className="mt-20 flex justify-center">
        <Image src={logo} height="120px" width="120px" />
      </div>
      <h1 className="text-3xl font-bold text-white self-center mt-2">
        Small Guide
      </h1>
      <SignInContainer providers={providers} />
    </div>
  );
};

export default SignIn;
