import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Button from './Button/Button';

type Dropdown = {
  items: Array<any>;
  setValue: Function;
  value: number | string;
  days?: boolean;
};

const Dropdown = ({ items, value, setValue, days }: Dropdown) => {
  const [isVisible, setVisible] = useState(false);
  const handleClick = (value: number) => {
    setVisible(false);
    setValue(value);
  };
  return (
    <div className="relative">
      <div className="flex">
        <h1 className="text-white text-3xl font-bold">
          {days && 'Day'} {days ? (value as number) + 1 : value}
        </h1>
        <Button
          icon={
            <MdKeyboardArrowDown
              className={`text-white text-3xl ${
                isVisible && 'transform rotate-180'
              }`}
            />
          }
          type="iconClean"
          className={`${items.length === 1 && 'hidden'}`}
          onClick={() => setVisible(!isVisible)}
        />
      </div>
      <ul
        className={`${
          isVisible ? 'absolute z-10 top-full left-0' : 'hidden'
        } text-white bg-secondaryDark w-full py-1 mt-2 rounded-lg border-2 border-primary`}
      >
        {items.map((item: any, index: number) => {
          return (
            <li key={index}>
              <Button
                type="texted"
                onClick={() => handleClick(days ? item.value : item)}
              >
                <h2 className="text-lg">
                  {days && 'Day'} {days ? item.value + 1 : item}
                </h2>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
