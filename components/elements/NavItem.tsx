import Link from '../units/Link';

interface Props {
  text: string;
  icon: any;
  to: string;
  onClick?: Function;
}

const NavItem = ({ text, icon, to, onClick }: Props) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-2xl font-semibold flex items-center text-white"
    >
      <span className="mr-5 text-3xl">{icon}</span>
      <h2>{text}</h2>
    </Link>
  </li>
);

export default NavItem;
