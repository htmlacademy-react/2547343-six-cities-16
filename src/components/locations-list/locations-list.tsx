import LocationItem from '../location-item/location-item';

type LocationItemProps = {
  cities: string[];
}

function LocationsList({ cities }: LocationItemProps) {
  const List = cities.map((item: string) => <LocationItem city={item} key={item} />);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {List}
      </ul>
    </section>
  );
}

export default LocationsList;
