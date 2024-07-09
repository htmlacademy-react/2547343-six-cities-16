type LocationItemProps = {
  city: string;
}

function LocationItem({ city }: LocationItemProps) {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationItem;
