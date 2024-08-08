import leaflet from 'leaflet';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState, useEffect } from 'react';
import { CityLocationType } from '../../types';


function useLeafletMap(mapRef: React.MutableRefObject<null>, city: CityLocationType): LeafletMap | null {

  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  useEffect(() => {

    if (mapRef.current !== null && !isRenderedRef.current && city.lat && city.lng) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom || 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;

    }


  }, [mapRef, city]);

  return map;
}

export default useLeafletMap;
