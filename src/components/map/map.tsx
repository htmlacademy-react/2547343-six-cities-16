import { Icon } from 'leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useLeafletMap from './use-map';
import { CityDataType, OfferType } from '../../types';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../../constants';
import { defaultCityCoordinates } from '../../mocks/city-coordinates';
import cn from 'classnames';

type MapProps = {
  cityData: CityDataType | undefined;
  mapType: string;
  offers: OfferType[];
  selectedPoint: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [20, 40]
});

function Map({ cityData, mapType, offers, selectedPoint }: MapProps): JSX.Element {
  cityData = cityData === undefined ? defaultCityCoordinates : cityData;
  const mapRef = useRef(null);
  const map = useLeafletMap(mapRef, cityData.location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer: OfferType) => {
        const point = offer.location;
        if (point.latitude && point.longitude) {
          leaflet
            .marker({
              lat: point.latitude,
              lng: point.longitude,
            }, {
              icon: (offer.id === selectedPoint)
                ? activeCustomIcon
                : defaultCustomIcon,
            })
            .addTo(map);
        }
      });
    }
  }, [map, offers, selectedPoint]);

  return (
    <section
      className={cn(
        'map',
        { 'cities__map': mapType === 'main' },
        { 'offer__map': mapType === 'offer' },
      )}
      ref={mapRef}
    >
    </section>


  );
}

export default Map;
