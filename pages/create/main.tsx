import type { NextPage } from 'next';
import { useState } from 'react';
import Button from '../../components/units/Button/Button';
import TextField from '../../components/units/TextField';
import { useDispatch, useSelector } from 'react-redux';
import {
  main,
  tripPlan,
  place as placeRedux,
} from '../../logic/redux/createTrip';
import { useSession } from 'next-auth/react';
import BackButton from '../../components/elements/BackButton';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { db, storage } from '../../firebase';
import { RootState } from '../../logic/redux/store';
import { Place } from '../../logic/Types/createTrip';
import ConfirmModal from '../../components/elements/ConfirmModal';
import router from 'next/router';
import Dropdown from '../../components/units/Dropdown';
import { TripCategoriesArray } from '../../logic/Types/trip';
import { tripsCategories } from '../../logic/constants';
import Loader from '../../components/units/Loader';
import pageAuthenticated, {
  PageAuthenticatedLoader,
} from '../../components/containers/PageAuthenticated';

const MainCreate: NextPage = () => {
  const dispatch = useDispatch();
  const categories: TripCategoriesArray = tripsCategories;
  const mainSelector = useSelector((state: RootState) => state.tripCreate.main);
  const trip = useSelector((state: RootState) => state.tripCreate.trip);
  const place = useSelector((state: RootState) => state.tripCreate.place);
  const [name, setName] = useState(mainSelector.name);
  const [desc, setDesc] = useState(mainSelector.desc);
  const [category, setCategory] = useState(categories[0]);
  const [tag, setTag] = useState(mainSelector.tags.join(', '));
  const [sending, setSending] = useState(false);
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const isValid = () => {
    return name.length > 3 && desc.length > 20 && tag.split(', ').length > 0;
  };

  const saveInStore = () => {
    const tagsList = tag.split(', ');
    dispatch(main({ name, desc, tags: tagsList }));
  };

  const clearStore = () => {
    dispatch(tripPlan([{ value: 0, places: [], gmapsUrl: '' }]));
    dispatch(placeRedux({ place: '', image: '' }));
    dispatch(main({ name: '', desc: '', tags: [] }));
  };

  const handleFinish = async () => {
    if (isValid()) {
      setSending(true);
      await handleCreateTrip();
      clearStore();
      router.push('/');
    }
  };

  const handleCreateTrip = async () => {
    if (session?.user) {
      const userName = session?.user?.name || 'Anonym';
      const tagsList = tag.split(', ');
      const docRef = await addDoc(collection(db, 'trips'), {
        name: name,
        desc: desc,
        tags: tagsList,
        category: category,
        author: (session.user as any)?.uid,
        userName: userName,
        place: place.place,
        image: '',
        saved: 0,
        trip: [],
        timeStamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `trips/${docRef.id}/image/`);
      await uploadBytes(
        imageRef,
        await fetch(place.image).then((r) => r.blob())
      ).then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'trips', docRef.id), {
          image: downloadUrl,
        });
      });

      updateDoc(doc(db, `users/${(session.user as any).uid}`), {
        createdTrips: arrayUnion(docRef.id),
      });

      const uploadImage = async (place: Place) => {
        let downloadUrl = '';
        if (place.img !== '') {
          const imageRefPlaces = ref(
            storage,
            `trips/${docRef.id}/places/${place.id}`
          );

          await uploadBytes(
            imageRefPlaces,
            await fetch(place.img).then((r) => r.blob())
          ).then(async () => {
            downloadUrl = await getDownloadURL(imageRefPlaces);
          });
        }

        return { ...place, img: downloadUrl };
      };

      const getData = async (places: Array<Place>) => {
        return Promise.all(places.map(async (item) => await uploadImage(item)));
      };

      const changeTrip = async () => {
        return Promise.all(
          trip.map(async (trip) => {
            return {
              ...trip,
              places: await getData(trip.places),
            };
          })
        );
      };

      await changeTrip().then((res) => {
        updateDoc(doc(db, 'trips', docRef.id), {
          trip: res,
        });
      });
    }
  };
  const { status } = useSession();
  if (pageAuthenticated(status)) {
    return <PageAuthenticatedLoader />;
  }

  return (
    <>
      <div className="flex flex-col h-screen relative">
        {openModal && (
          <ConfirmModal setVisible={setOpenModal} onFinish={handleFinish} />
        )}
        {sending && (
          <div className="absolute h-full w-full bg-dark z-50 grid place-items-center">
            <div className="flex flex-col items-center justify-center gap-6">
              <Loader />
              <h1 className="font-bold text-2xl text-sky-200 px-4 text-center">
                Trip is generated. <br />
                Please wait...
              </h1>
            </div>
          </div>
        )}
        <BackButton
          className="ml-4 mt-4"
          onClick={() => saveInStore()}
          to="/create/place"
        />
        <div className="mt-16 mx-4 pb-4">
          <h1 className="text-white font-bold text-3xl">Step 3</h1>
          <p className="text-grey mt-2 text-lg">
            Fill in rest of information about trip
          </p>
          <div className="mt-10">
            <TextField
              setText={setName}
              text={name}
              type="secondary"
              rounded="lg"
              className="h-10"
              label="Trip name:"
              containerClassName="my-6"
            />
            <TextField
              setText={setDesc}
              text={desc}
              type="secondary"
              multiline
              rounded="lg"
              className="h-10"
              label="Trip description:"
              containerClassName="my-6"
            />
            <TextField
              setText={setTag}
              text={tag}
              type="secondary"
              rounded="lg"
              className="h-10"
              containerClassName="my-6"
              label="Tags:"
            />
            <Dropdown
              setValue={setCategory}
              value={category}
              items={categories}
            />
            <Button
              size="big"
              className="mt-8 h-12 w-full"
              onClick={() => isValid() && setOpenModal(true)}
              disabled={!isValid()}
            >
              Create Trip
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCreate;
