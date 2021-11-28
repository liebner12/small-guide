import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SearchBar from '../elements/SearchBar';
import Navbar from './Navbar';

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <header>
      <div className="pb-4">
        <div className="flex flex-col">
          <Navbar
            toggleNav={() => setIsNavVisible(!isNavVisible)}
            isNavVisible={isNavVisible}
            session={session}
          />
          <div className="mt-24 mx-4 pb-4">
            <h1 className="text-2xl text-whiteGrey font-semibold">
              Hi {session?.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-whiteGrey font-light">
              Where do you want to go?
            </p>
          </div>
        </div>
        <SearchBar toggleNav={() => setIsNavVisible(!isNavVisible)} />
      </div>
    </header>
  );
};

export default Header;
