import LocationItem from '../location-item/location-item';

type LocationItemProps = {
  cities: string[];
  activeCity: string;
}

function LocationsList({ cities, activeCity }: LocationItemProps) {
  const list = cities.map((item: string) => <LocationItem city={item} key={item} activeCity={activeCity} />);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {list}
      </ul>
    </section>
  );
}

export default LocationsList;
