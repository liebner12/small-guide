import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';
import CreateTripWrapper from '../../components/containers/CreatTripWrapper';
import PlaceTrip from '../../components/layouts/PlaceTrip';

const CreatePlace: NextPage = () => {
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <CreateTripWrapper>
      <PlaceTrip />
    </CreateTripWrapper>
  );
};

export default CreatePlace;
