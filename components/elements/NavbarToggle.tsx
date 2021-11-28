import Image from 'next/image';
import Button from '../units/Button/Button';
import { FaUserAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface Props {
  toggleNavbar: Function;
  className?: string;
  iconStyle?: string;
}

const NavbarToggle = ({ toggleNavbar, className, iconStyle }: Props) => {
  const { data: session } = useSession();
  const login = { to: session ? '' : '/auth/signin' };
  return (
    <>
      <Button
        className={className}
        type="iconClean"
        icon={
          session?.user?.image ? (
            <Image
              src={session?.user?.image}
              width={32}
              height={32}
              quality={100}
              className={`rounded-full ${iconStyle ? iconStyle : 'h-8 w-8'}`}
            />
          ) : (
            <FaUserAlt
              className={`text-white bg-primary rounded-full p-1 ${
                iconStyle ? iconStyle : 'h-8 w-8'
              }`}
            />
          )
        }
        onClick={session && toggleNavbar}
        {...login}
      />
    </>
  );
};

export default NavbarToggle;
