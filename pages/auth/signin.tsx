import { getProviders } from 'next-auth/react';
import { Providers } from '../../logic/Types/providers';
import SignInLayout from '../../components/layouts/SignIn';

type SignIn = {
  providers: Providers;
};

const SignIn = ({ providers }: SignIn) => {
  return (
    <>
      <SignInLayout providers={providers} />
    </>
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
