import LocationItem from '../location-item/location-item';
import { store, setCity } from '../../store';

type LocationItemProps = {
  cities: { id: string; name: string }[];
  activeCity: string;
}

function LocationsList({ cities, activeCity }: LocationItemProps) {
  const dispatch = store.dispatch;
  dispatch(setCity(activeCity));

  const list = cities.map((item: { id: string; name: string }) => <LocationItem city={item} key={item.id} activeCity={activeCity} />);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {list}
      </ul>
    </section>
  );
}

export default LocationsList;
