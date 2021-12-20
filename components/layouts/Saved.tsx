import SavedTrips from '../containers/SavedTrips';
import BackButton from '../elements/BackButton';

const Saved = () => {
  return (
    <div className="mx-4 py-4 h-screen flex flex-col">
      <div className="flex items-center">
        <BackButton to="/" />
        <h1 className="text-2xl font-bold text-white">Saved trips</h1>
      </div>
      <SavedTrips />
    </div>
  );
};

export default Saved;
