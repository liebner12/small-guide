import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../units/Button/Button';

type BackButton = {
  className?: string;
};

const BackButton = ({ className }: BackButton) => {
  const router = useRouter();
  return (
    <Button
      icon={
        <FiArrowLeft
          className={`text-white mr-3 flex-shrink-0 h-6 w-6 ${className}`}
        />
      }
      type="iconClean"
      size="round"
      onClick={() => router.back()}
    />
  );
};

export default BackButton;
