import London from '../../assets/images/london.jpg';
import Rome from '../../assets/images/rome.jpg';
import Prague from '../../assets/images/prague.jpg';
import Paris from '../../assets/images/Paris.jpg';
import ShortCard from '../elements/ShortCard/ShortCard';

const PlacesContainer = () => (
  <div>
    <h2 className="text-white text-base font-semibold mb-2">
      Most popular cities
    </h2>
    <div className="grid gap-5 grid-cols-2">
      <ShortCard to="/" imageSrc={London} text="London" />
      <ShortCard to="/" imageSrc={Rome} text="Rome" />
      <ShortCard to="/" imageSrc={Prague} text="Prague" />
      <ShortCard to="/" imageSrc={Paris} text="Paris" />
    </div>
  </div>
);

export default PlacesContainer;
