import { Link } from 'react-router-dom';

type LocationItemProps = {
  city: { id: string; name: string };
  activeCity: string;
}

function LocationItem({ city, activeCity }: LocationItemProps) {

  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${activeCity === `${city.id}` ? 'tabs__item tabs__item--active' : ''}`} to={`/${city.id}`}>
        <span>{city.name}</span>
      </Link>
    </li >
  );
}

export default LocationItem;
