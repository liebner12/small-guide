import { FaUserAlt } from 'react-icons/fa';
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineCog,
  HiOutlineX,
  HiPlus,
} from 'react-icons/hi';
import NavbarToggle from '../elements/NavbarToggle';
import NavItem from '../elements/NavItem';
import Button from '../units/Button/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Session } from 'next-auth';

const variants = {
  open: {
    clipPath: `circle(calc(110vh * 2) at calc(100% - 32px) 32px)`,
    transition: {
      type: 'spring',
      stiffness: 60,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(calc(0px + 0px) at calc(100% - 32px) 32px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

type Navbar = {
  toggleNav: Function;
  isNavVisible: Boolean;
  session: Session | null;
};

const Navbar = ({ isNavVisible, toggleNav, session }: Navbar) => {
  return (
    <>
      <NavbarToggle toggleNavbar={toggleNav} className="mt-4 mx-4 ml-auto" />
      <motion.div
        initial={false}
        variants={variants}
        animate={isNavVisible ? 'open' : 'closed'}
        className="w-full h-screen bg-blackOpacity backdrop-blur-xl backdrop-filter fixed top-0 z-40 flex flex-col"
      >
        <Button
          type="iconClean"
          icon={<HiOutlineX />}
          className="text-4xl ml-auto absolute top-4 right-4 text-white"
          onClick={toggleNav}
        />
        <div className="flex text-white items-center mx-8 mt-auto mb-8">
          <div className="mr-4 flex items-center">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                width={48}
                height={48}
                quality={48}
                className="rounded-full"
              />
            ) : (
              <FaUserAlt className="bg-primary rounded-full p-1.5 h-12 w-12" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{session?.user?.name}</h1>
            <p className="text-grey">{session?.user?.email}</p>
          </div>
        </div>
        <ul className="flex flex-col justify-between h-1/2 p-8 mb-auto">
          <NavItem
            text="Manage account"
            icon={<HiOutlineUser />}
            to="/profile"
          />
          <NavItem text="Saved" icon={<HiOutlineHeart />} to="/profile/saved" />
          <NavItem text="Add trip" icon={<HiPlus />} to="/create" />
          <NavItem text="Settings" icon={<HiOutlineCog />} to="/" />
        </ul>
      </motion.div>
    </>
  );
};

export default Navbar;
