import { ReactChild, ReactChildren, useEffect } from 'react';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { push } from '../../logic/redux/trip';
import { Trip } from '../../logic/Types/trip';
import { useSession } from 'next-auth/react';
import { evenUser } from '../../logic/redux/user';

interface AppWrapper {
  children: ReactChild | ReactChildren;
}

const AppWrapper = ({ children }: AppWrapper) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const fetchInitial = async () => {
    const q = query(collection(db, 'trips'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dispatch(
        push({
          ...doc.data(),
          id: doc.id,
          timeStamp: doc.data().timeStamp.toDate().toDateString(),
        } as Trip)
      );
    });
  };

  const fetchUser = async () => {
    const docRef = doc(db, `users/${(session?.user as any).uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(evenUser(docSnap.data().trip));
    }
  };

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchUser();
    }
  }, [status]);

  return <>{children}</>;
};

export default AppWrapper;
