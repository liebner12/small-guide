import { useState } from 'react';
import { FiSearch, FiArrowLeft, FiX } from 'react-icons/fi';
import NavbarToggle from './NavbarToggle';
import Link from '../units/Link';
import Button from '../units/Button/Button';
import { useRouter } from 'next/router';
import useOnScreen from '../../logic/hooks/useOnScreen';
import TextField from '../units/TextField';

type SearchBar = {
  toggleNav: Function;
};

const SearchBar = ({ toggleNav }: SearchBar) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  const { ref, isIntersecting } = useOnScreen(true, options);

  const toggler = () => {
    toggleNav();
  };

  return (
    <>
      <div ref={ref}>
        <div
          className={`flex items-center top-0 flex-start flex-1 z-30 transition-all ${
            !isIntersecting
              ? 'fixed top-0 w-full mx-0 bg-dark border-b-2 border-primary'
              : 'mx-4 rounded-xl bg-secondaryDark '
          }`}
        >
          <Link
            to="/search"
            className={`w-full flex items-center pl-4 ${
              !isIntersecting ? 'py-3.5' : 'py-2.5'
            }`}
          >
            <Button
              icon={<FiSearch className="text-white h-5 w-5" />}
              type="iconClean"
              size="round"
              className="flex-shrink-0 mr-3"
            />
            <p className="text-whiteGrey opacity-75 font-light">
              Type in town name...
            </p>
          </Link>

          {!isIntersecting && (
            <NavbarToggle
              toggleNavbar={() => toggler()}
              className="flex-shrink-0 px-4"
              iconStyle="h-7 w-7"
            />
          )}
        </div>
        {!isIntersecting && ref.current && (
          <div style={{ height: ref.current.offsetHeight }} />
        )}
      </div>
    </>
  );
};

export const SearchBarInput = () => {
  const [text, setText] = useState('');
  const router = useRouter();
  return (
    <>
      <div
        className="flex items-center flex-start flex-1 z-30 sticky top-0 left-0 w-full mx-0 bg-dark border-b-2 border-primary px-4 py-2"
        style={{ height: 54 }}
      >
        <TextField
          setText={setText}
          text={text}
          placeholder="Type in town name..."
          type="secondary"
          autoFocus
          icon={
            <Button
              icon={<FiArrowLeft className="text-white h-5 w-5" />}
              type="iconClean"
              className="flex-shrink-0 mr-3"
              size="round"
              onClick={() => router.back()}
            />
          }
        />
        {text && (
          <Button
            icon={<FiX className="text-white h-5 w-5" />}
            type="iconClean"
            className="flex-shrink-0 ml-3"
            size="round"
            onClick={() => setText('')}
          />
        )}
      </div>
    </>
  );
};

export default SearchBar;
