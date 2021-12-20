import BackButton from '../elements/BackButton';
import MainTripContainer from '../containers/MainTrip';
import LoaderFullscreen from '../elements/LoaderFullscreen';
import ConfirmModal from '../elements/ConfirmModal';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { TripCategoriesArray } from '../../logic/Types/trip';
import { RootState } from '../../logic/redux/store';
import { tripsCategories } from '../../logic/constants';
import {
  main,
  tripPlan,
  place as placeRedux,
  edit as editRedux,
} from '../../logic/redux/createTrip';
import Router from 'next/router';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Place } from '../../logic/Types/createTrip';

const MainTrip = () => {
  const dispatch = useDispatch();
  const categories: TripCategoriesArray = tripsCategories;
  const mainSelector = useSelector((state: RootState) => state.tripCreate.main);
  const trip = useSelector((state: RootState) => state.tripCreate.trip);
  const place = useSelector((state: RootState) => state.tripCreate.place);
  const edit = useSelector((state: RootState) => state.tripCreate.edit);
  const [name, setName] = useState(mainSelector.name);
  const [desc, setDesc] = useState(mainSelector.desc);
  const [category, setCategory] = useState(categories[0]);
  const [tag, setTag] = useState(mainSelector.tags.join(', '));
  const [sending, setSending] = useState(false);
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  const planIsValid = () => {
    return trip !== [{ value: 0, places: [], gmapsUrl: '' }];
  };

  const placeIsValid = () => {
    return place.image !== '' && place.place !== '';
  };

  const isValid = () => {
    return (
      name.length > 3 &&
      desc.length > 15 &&
      tag.split(', ').length > 0 &&
      planIsValid() &&
      placeIsValid()
    );
  };

  const saveInStore = () => {
    const tagsList = tag.split(', ');
    dispatch(main({ name, desc, tags: tagsList }));
  };

  const clearStore = () => {
    dispatch(tripPlan([{ value: 0, places: [], gmapsUrl: '' }]));
    dispatch(placeRedux({ place: '', image: '' }));
    dispatch(main({ name: '', desc: '', tags: [] }));
    dispatch(editRedux(''));
  };

  const handleFinish = async () => {
    if (isValid()) {
      setSending(true);
      await handleCreateTrip();
      clearStore();
      Router.push('/');
    }
  };

  const documentData = () => {
    const userName = session?.user?.name || 'Anonym';
    const tagsList = tag.split(', ');
    return {
      name: name,
      desc: desc,
      tags: tagsList,
      category: category,
      author: (session!.user as any)?.uid,
      userName: userName,
      place: place.place,
      image: '',
      saved: 0,
      trip: [],
      timeStamp: serverTimestamp(),
    };
  };

  const addNewDoc = async () => {
    return await addDoc(collection(db, 'trips'), documentData());
  };

  const updateDocument = () => {
    return updateDoc(doc(db, `trips/${edit}`), documentData());
  };

  const updateMainImage = async (id: string) => {
    const imageRef = ref(storage, `trips/${id}/image/`);
    const fetchedImage = await fetch(place.image)
      .then((r) => r.blob())
      .catch((err) => {
        console.log(err);
      });
    if (fetchedImage) {
      await uploadBytes(imageRef, fetchedImage).then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'trips', id), {
          image: downloadUrl,
        });
      });
    } else {
      await updateDoc(doc(db, 'trips', id), {
        image: place.image,
      });
    }
    updateDoc(doc(db, `users/${(session!.user as any).uid}`), {
      createdTrips: arrayUnion(id),
    });
  };

  const uploadPlacesImages = async (id: string) => {
    const uploadImage = async (place: Place) => {
      let downloadUrl = '';
      if (place.img !== '') {
        const imageRefPlaces = ref(storage, `trips/${id}/places/${place.id}`);
        const fetchedImage = await fetch(place.img)
          .then((r) => r.blob())
          .catch((err) => {
            console.log(err);
          });
        if (fetchedImage) {
          await uploadBytes(imageRefPlaces, fetchedImage).then(async () => {
            downloadUrl = await getDownloadURL(imageRefPlaces);
          });
        } else {
          downloadUrl = place.img;
        }
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
      updateDoc(doc(db, 'trips', id), {
        trip: res,
      });
    });
  };

  const handleCreateTrip = async () => {
    if (session?.user) {
      if (edit !== '') {
        await updateDocument();
        await updateMainImage(edit);
        await uploadPlacesImages(edit);
      } else {
        const docRef = await addNewDoc();
        await updateMainImage(docRef.id);
        await uploadPlacesImages(docRef.id);
      }
    }
  };
  return (
    <div className="flex flex-col h-screen relative">
      {openModal && (
        <ConfirmModal setVisible={setOpenModal} onFinish={handleFinish} />
      )}
      {sending && <LoaderFullscreen />}
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
        <MainTripContainer
          desc={desc}
          setDesc={setDesc}
          setOpenModal={setOpenModal}
          name={name}
          setName={setName}
          setTag={setTag}
          tag={tag}
          isValid={isValid}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>
    </div>
  );
};

export default MainTrip;
