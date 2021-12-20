import type { NextPage } from 'next';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import CreateTripWrapper from '../../components/containers/CreatTripWrapper';
import MainTrip from '../../components/layouts/MainTrip';
import { useSession } from 'next-auth/react';

const MainCreate: NextPage = () => {
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <CreateTripWrapper>
      <MainTrip />
    </CreateTripWrapper>
  );
};

export default MainCreate;
