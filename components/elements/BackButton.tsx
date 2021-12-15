import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../units/Button/Button';

type BackButton = {
  className?: string;
  onClick?: Function;
  to?: string;
};

const BackButton = ({ className, onClick, to }: BackButton) => {
  const router = useRouter();
  const action = () => {
    if (onClick) onClick();
    if (!to) router.back();
  };

  return (
    <Button
      icon={
        <FiArrowLeft
          className={`text-white mr-3 flex-shrink-0 h-6 w-6 ${className}`}
        />
      }
      type="iconClean"
      size="round"
      onClick={() => action()}
      to={to}
    />
  );
};

export default BackButton;
