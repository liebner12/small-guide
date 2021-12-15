import { useSession } from 'next-auth/react';
import React from 'react';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import Profile from '../../components/layouts/Profile';

function index() {
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <>
      <Profile />
    </>
  );
}

export default index;
