import BackButton from '../elements/BackButton';
import PlaceTripContainer from '../containers/PlaceTrip';
const PlaceTrip = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackButton className="ml-4 mt-4" to="/create" />
      <div className="mt-16 mx-4 pb-4 h-full flex flex-col">
        <h1 className="text-white font-bold text-3xl">Step 2</h1>
        <p className="text-grey mt-2 text-lg">
          Fill in name and add main trip image
        </p>
        <PlaceTripContainer />
      </div>
    </div>
  );
};

export default PlaceTrip;
