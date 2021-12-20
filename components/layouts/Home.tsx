import { useSelector } from 'react-redux';
import CategoryTrips from '../containers/CategoryTrips';
import { RootState } from '../../logic/redux/store';
import Header from '../containers/Header';
import { getFilteredTrip } from '../../logic/utils';
import Image from 'next/image';
import BackgroundImage from '../../assets/images/background.webp';
import DefaultCard from '../elements/DefaultCard/DefaultCard';

const Home = () => {
  const trips = useSelector((state: RootState) => state.trip);

  return (
    <div className="relative h-full">
      <div className="w-full absolute h-96 top-0 left-0">
        <Image
          src={BackgroundImage}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
      </div>

      <div className="header-bg h-screen w-full absolute top-0 left-0"></div>
      <div className="relative">
        <Header />
        <main className="flex flex-col gap-6 pb-10">
          <div className="mx-4">
            <h2 className="text-white text-base font-semibold mb-2 flex items-center justify-between mr-4">
              Newest trip!
            </h2>
            <DefaultCard trip={trips[0]} layoutId={trips[0]?.id} />
          </div>
          <CategoryTrips
            trips={getFilteredTrip(trips.slice(1), 'City')}
            title="Trips in cities:"
          />
          <CategoryTrips
            trips={getFilteredTrip(trips.slice(1), 'Sea')}
            title="Near sea:"
          />
          <CategoryTrips
            trips={getFilteredTrip(trips.slice(1), 'Tropical')}
            title="Tropical trips:"
          />
          <CategoryTrips
            trips={getFilteredTrip(trips.slice(1), 'Mountain')}
            title="Mountain trips:"
          />
          <CategoryTrips
            trips={getFilteredTrip(trips.slice(1), 'Rural')}
            title="Rural trips:"
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
