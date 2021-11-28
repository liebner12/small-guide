import { useSelector } from 'react-redux';
import Places from '../../components/containers/Places';
import CategoryTrips from '../containers/CategoryTrips';
import { RootState } from '../../logic/redux/store';
import Header from '../containers/Header';
import { getFilteredTrip } from '../../logic/utils';
import Image from 'next/image';
import BackgroundImage from '../../assets/images/background.jpg';

const Home = () => {
  const trips = useSelector((state: RootState) => state.trip);

  return (
    <div className="relative h-full">
      <div className="w-full absolute h-96 top-0 left-0">
        <Image
          src={BackgroundImage}
          className="w-full h-full absolute"
          placeholder="blur"
        />
      </div>

      <div className="header-bg h-screen w-full absolute top-0 left-0"></div>
      <div className="relative">
        <Header />
        <main className="flex flex-col gap-6">
          <div className="mx-4 flex flex-col gap-6">
            <Places />
          </div>
          <CategoryTrips
            trips={getFilteredTrip(trips, 'City')}
            title="Trips in cities:"
          />
        </main>
        <footer className="flex w-full justify-center mt-1">
          <h1 className="text-white">Copyright &#x24D2; Small Guide </h1>
        </footer>
      </div>
    </div>
  );
};

export default Home;
