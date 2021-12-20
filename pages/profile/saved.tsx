import { useSession } from 'next-auth/react';
import React from 'react';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import SavedTrips from '../../components/layouts/Saved';
function Saved() {
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <>
      <SavedTrips />
    </>
  );
}

export default Saved;
