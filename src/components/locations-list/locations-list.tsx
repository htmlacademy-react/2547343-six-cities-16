import { memo } from 'react';
import LocationItem from '../location-item/location-item';
type LocationItemProps = {
  cities: { id: string; name: string }[];
  activeCity: string;
}

function LocationsList({ cities, activeCity }: LocationItemProps) {

  const list = cities.map((item: { id: string; name: string }) => <LocationItem city={item} key={item.id} activeCity={activeCity} />);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {list}
      </ul>
    </section>
  );
}

const LocationsListMemoized = memo(LocationsList, (prevProps, nextProps) => prevProps.activeCity === nextProps.activeCity);

export default LocationsListMemoized;
