import { Link } from 'react-router-dom';

type LocationItemProps = {
  city: string;
  activeCity: string;
}

function LocationItem({ city, activeCity }: LocationItemProps) {

  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${activeCity === `:${city}` ? 'tabs__item tabs__item--active' : ''}`} to={`/:${city}`}>
        <span>{city}</span>
      </Link>
    </li >
  );
}

export default LocationItem;
