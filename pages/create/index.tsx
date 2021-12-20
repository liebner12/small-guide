import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import CreateTrip from '../../components/layouts/CreateTrip';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import CreateTripWrapper from '../../components/containers/CreatTripWrapper';

const Create: NextPage = () => {
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <CreateTripWrapper>
      <CreateTrip />
    </CreateTripWrapper>
  );
};

export default Create;
