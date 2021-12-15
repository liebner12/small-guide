import { getProviders, signIn as signIntoProvider } from 'next-auth/react';
import Button from '../../components/units/Button/Button';
import { AiOutlineGoogle } from 'react-icons/ai';
import BackButton from '../../components/elements/BackButton';
import Image from 'next/image';
import logo from '../../assets/icons/logo512x512.svg';
import { useEffect, useState } from 'react';
type SignIn = {
  providers: Object;
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
        Small guide
      </h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="mt-auto">
            <Button
              onClick={() =>
                signIntoProvider(provider.id, {
                  callbackUrl: '/',
                })
              }
              size="big"
              className="w-full justify-center"
              icon={<AiOutlineGoogle className="h-8 w-8 mr-2" />}
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
