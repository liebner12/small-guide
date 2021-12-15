import Router from 'next/router';
import Loader from '../units/Loader';

const pageAuthenticated = (
  status: 'loading' | 'unauthenticated' | 'authenticated'
) => {
  if (status === 'loading') {
    return true;
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin');
    return true;
  }
  return false;
};

export default pageAuthenticated;

export const PageAuthenticatedLoader = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <Loader />
    </div>
  );
};
