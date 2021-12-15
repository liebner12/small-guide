import { HiOutlineX } from 'react-icons/hi';
import Button from '../units/Button/Button';

type FinishModal = {
  setVisible: Function;
  onFinish: Function;
  text?: string;
};

const FinishModal = ({ setVisible, onFinish, text }: FinishModal) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div
        className="absolute z-50 w-full h-screen bg-blackOpacity"
        onClick={() => setVisible(false)}
      />
      <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 bg-secondaryDark rounded-lg p-4 py-6">
        <Button
          icon={<HiOutlineX />}
          type="iconClean"
          className="text-2xl ml-auto text-white absolute right-2 top-2"
          onClick={() => setVisible(false)}
        />
        <h1 className="text-white font-bold text-2xl">{text}</h1>
        <div className="flex justify-end mt-4">
          <Button size="big" className="mr-2" onClick={() => onFinish()}>
            Yes
          </Button>
          <Button type="texted" onClick={() => setVisible(false)}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

const defaultProps = {
  text: 'Have you finished?',
};

FinishModal.defaultProps = defaultProps;

export default FinishModal;
