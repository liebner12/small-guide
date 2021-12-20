import Loader from '../units/Loader';

const LoaderFullscreen = () => {
  return (
    <div className="absolute h-full w-full bg-dark z-50 grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <Loader />
        <h1 className="font-bold text-2xl text-sky-200 px-4 text-center">
          Trip is generated. <br />
          Please wait...
        </h1>
      </div>
    </div>
  );
};

export default LoaderFullscreen;
