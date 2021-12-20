import { IoCloudOffline } from 'react-icons/io5';

export default function Offline() {
  return (
    <div className="mx-4 py-4 h-screen grid place-items-center">
      <div className="flex flex-col items-center">
        <IoCloudOffline className="h-44 w-44 text-blue-500 mb-4" />
        <h1 className="text-white text-3xl font-semibold text-center">
          You are offline. Please connect to internet.
        </h1>
      </div>
    </div>
  );
}
