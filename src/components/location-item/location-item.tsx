import { Link } from 'react-router-dom';
import { setCity } from '../../store/slices/city-slice';
import { useAppDispatch } from '../../hooks';

type LocationItemProps = {
  city: { id: string; name: string };
  activeCity: string;
}

function LocationItem({ city, activeCity }: LocationItemProps) {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setCity(activeCity));
  };

  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link tabs__item ${activeCity === `${city.id}`
          ? 'tabs__item tabs__item--active'
          : ''}`}
        onClick={onClickHandler}
        to={`/${city.id}`}
      >
        <span>{city.name}</span>
      </Link>
    </li >
  );
}

export default LocationItem;
