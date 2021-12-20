import { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineClear } from 'react-icons/md';
import Button from './Button/Button';

type Dropdown = {
  items: Array<any>;
  setValue: Function;
  value: number | string;
  days?: boolean;
  onDelete?: Function;
};

const Dropdown = ({ items, value, setValue, days, onDelete }: Dropdown) => {
  const [isVisible, setVisible] = useState(false);
  const handleClick = (value: number) => {
    setVisible(false);
    setValue(value);
  };

  const onDeleteWrapper = (id: number) => {
    if (onDelete) onDelete(id);
    setVisible(false);
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
        } text-white bg-secondaryDark w-56 py-1 mt-2 rounded-lg border-2 border-primary`}
      >
        {items.map((item: any, index: number) => {
          return (
            <li key={index} className="flex items-center justify-between">
              <Button
                type="texted"
                size="noSize"
                className="w-full flex flex-start px-2 py-2"
                onClick={() => handleClick(days ? item.value : item)}
              >
                <h2 className="text-lg">
                  {days && 'Day'} {days ? item.value + 1 : item}
                </h2>
              </Button>
              {onDelete && (
                <div className="ml-auto">
                  <Button
                    icon={
                      <MdOutlineClear className="w-6 h-6 bg-dark p-1 rounded-lg" />
                    }
                    type="iconClean"
                    className="ml-auto p-2"
                    onClick={() => onDeleteWrapper(item.value)}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
