import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { db } from '../../firebase';
import { ArrayTrips } from '../../logic/Types/trip';
import DefaultCard from '../elements/DefaultCard/DefaultCard';
import Button from '../units/Button/Button';
import ConfirmModal from '../elements/ConfirmModal';
import { RiFileList3Fill } from 'react-icons/ri';
import { deleteObject, getStorage, listAll, ref } from 'firebase/storage';
type CreatedTrips = {
  trips: ArrayTrips;
  setTrips: Function;
};

const CreatedTrips = ({ trips, setTrips }: CreatedTrips) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  const deleteImages = (path: string) => {
    const storage = getStorage();
    const listRef = ref(storage, path);
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
        res.prefixes.forEach((folderRef) => {
          deleteImages(folderRef.fullPath);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTrip = () => {
    updateDoc(doc(db, `users/${(session?.user as any).uid}`), {
      createdTrips: arrayRemove(selectedTrip),
    });
    deleteDoc(doc(db, 'trips', selectedTrip));
    deleteImages(`trips/${selectedTrip}`);
    setTrips(trips.filter((trip) => trip.id !== selectedTrip));
    setVisible(false);
  };

  const handleButton = (id: string) => {
    setSelectedTrip(id);
    setVisible(true);
  };

  return (
    <div>
      {visible && (
        <ConfirmModal
          setVisible={setVisible}
          onFinish={deleteTrip}
          text="Do you really want to delete this trip?"
        />
      )}
      {trips?.length > 0 ? (
        <>
          <h2 className="text-white text-base font-semibold mb-8 flex items-center justify-between mr-4">
            Wycieczki użytkownika
            <Button
              icon={<MdEdit />}
              type="iconClean"
              onClick={() => setEditMode(!editMode)}
            />
          </h2>
          <ul className="flex flex-col gap-4">
            {trips.map((trip) => (
              <div key={trip.id}>
                <div className="flex items-center mb-1 h-10">
                  <h3 className="text-white font-semibold text-lg flex items-center">
                    Liczba polubień: {trip.saved}
                    <AiFillHeart className="ml-2" />
                  </h3>
                  {editMode && (
                    <Button
                      className="ml-auto"
                      type="warning"
                      size="big"
                      onClick={() => handleButton(trip.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
                <DefaultCard trip={trip} />
              </div>
            ))}
          </ul>
        </>
      ) : (
        <div className="text-white flex items-start justify-center w-full my-4">
          <div className="flex flex-col items-center text-xl font-semibold">
            <RiFileList3Fill className="h-10 w-10 mb-2" />
            <h2>List is empty</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedTrips;
