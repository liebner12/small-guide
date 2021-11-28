import { Dispatch, SetStateAction } from 'react';
import useComponentFocus from '../../logic/hooks/useComponentFocus';

type TextField = {
  setText: Function | Dispatch<SetStateAction<string>>;
  text: string;
  placeholder?: string;
  type?: 'primary' | 'secondary';
  icon?: any;
  className?: string;
  rounded?: 'full' | 'lg';
  textType?: string;
  multiline?: boolean;
  autoFocus: boolean;
  onChange?: Function;
  maxLength?: number;
  label?: string;
  containerClassName?: string;
};

const TextField = ({
  text,
  setText,
  placeholder,
  type,
  rounded,
  icon,
  className,
  textType,
  multiline,
  autoFocus,
  maxLength,
  label,
  containerClassName,
}: TextField) => {
  const { ref, isComponentFocused, setIsComponentFocused } =
    useComponentFocus(autoFocus);

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={text}
          className="text-white text-lg font-semibold mb-1 inline-block"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center ${
          type === 'primary' &&
          `bg-dark rounded-${rounded} ${icon ? 'px-4' : 'px-2'}`
        } w-full ${className}`}
      >
        {icon}
        {multiline ? (
          <textarea
            style={{ resize: 'none' }}
            ref={ref}
            onFocus={() => setIsComponentFocused(true)}
            onBlur={() => setIsComponentFocused(false)}
            value={text}
            name={text}
            maxLength={maxLength}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className={`w-full transition-all h-full placeholder-whiteGrey::placeholder text-white outline-none py-1.5 rounded-${rounded} ${
              type === 'primary' ? 'px-2' : 'px-4'
            } ${
              type !== 'primary'
                ? isComponentFocused
                  ? 'bg-dark'
                  : 'bg-secondaryDark'
                : 'bg-dark'
            }`}
          ></textarea>
        ) : (
          <input
            ref={ref}
            type={textType}
            onFocus={() => setIsComponentFocused(true)}
            onBlur={() => setIsComponentFocused(false)}
            maxLength={maxLength}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className={`w-full transition-all h-full placeholder-whiteGrey::placeholder rounded-${rounded} text-white outline-none py-1.5 ${
              type === 'primary' ? 'px-2' : 'px-4'
            } ${
              type !== 'primary'
                ? isComponentFocused
                  ? 'bg-dark'
                  : 'bg-secondaryDark'
                : 'bg-dark'
            }`}
          />
        )}
      </div>
    </div>
  );
};

const defaultValues = {
  type: 'primary',
  rounded: 'full',
  textType: 'text',
  multiline: false,
  autoFocus: false,
  maxLength: 150,
};

TextField.defaultProps = defaultValues;

export default TextField;
