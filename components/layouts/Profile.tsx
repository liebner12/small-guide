import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import Button from '../../components/units/Button/Button';
import { useSession, signOut } from 'next-auth/react';
import BackButton from '../elements/BackButton';

export default function Profile() {
  const { data: session } = useSession();
  return (
    <div className="mx-4 py-4 h-screen flex flex-col">
      <BackButton />
      {session && (
        <Button
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
          icon={<HiOutlineLogout className="mr-2 h-6 w-6" />}
          size="big"
          className="flex items-center justify-center w-full mt-auto text-lg py-2"
        >
          Logout
        </Button>
      )}
    </div>
  );
}
