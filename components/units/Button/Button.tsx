import { getKeyValue } from '../../../logic/utils';
import Link from '../Link';

const Button = ({ children, className, icon, ...props }: ButtonProps) => {
  const { iconPosition, onClick, type, size, disabled, ...restProps } = props;
  const link = props.href
    ? { href: props.href }
    : props.to
    ? { to: props.to }
    : false;

  const styles = `disabled:opacity-50 ${className} ${
    icon && 'flex items-center'
  } ${getKeyValue(type)(COLOR)} ${
    type !== 'iconClean' && getKeyValue(size)(SIZE)
  }`;

  if (link) {
    return (
      <Link onClick={onClick} className={styles} {...link} {...restProps}>
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </Link>
    );
  }

  return (
    <button
      {...restProps}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  );
};

const COLOR = {
  primary:
    'bg-primary hover:bg-cyan-800 text-whiteGrey focus:text-white font-semibold',
  warning:
    'bg-red-600 hover:bg-red-700 text-whiteGrey focus:text-white font-semibold',
  icon: 'bg-black bg-opacity-40 backdrop-blur backdrop-filter rounded-full',
  iconClean: 'rounded-full',
  texted: 'text-white font-semibold',
  plane: '',
};

const SIZE = {
  primary: 'px-2.5 py-0.5 text-base rounded-full',
  small: 'px-2.5 text-sm rounded-full leading-6',
  wide: 'px-3.5 py-0.5 text-base rounded-lg',
  round: 'px-1 py-1',
  noSize: '',
  big: 'px-5 py-1 text-base rounded-lg',
};

type ButtonProps = {
  type: 'primary' | 'icon' | 'texted' | 'iconClean' | 'plane' | 'warning';
  size?: 'primary' | 'small' | 'wide' | 'round' | 'noSize' | 'big';
  className?: string;
  children?: React.ReactChild | React.ReactChildren[];
  icon?: any;
  iconPosition?: 'left' | 'right';
  href?: string;
  to?: string;
  onClick?: any;
  disabled?: boolean;
} & typeof defaultValues;

const defaultValues = {
  type: 'primary',
  size: 'primary',
  iconPosition: 'left',
  disabled: false,
};

Button.defaultProps = defaultValues;

export default Button;
