import leaflet from 'leaflet';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState, useEffect } from 'react';
import { CityLocationType } from '../../types';


function useLeafletMap(mapRef: React.MutableRefObject<null>, cityData: CityLocationType): LeafletMap | null {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  useEffect(() => {

    const point = cityData.location;
    if (
      mapRef.current !== null
      && !isRenderedRef.current
      && point.latitude
      && point.longitude) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: point.latitude,
          lng: point.longitude,
        },
        zoom: point.zoom || 10,
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
    } else {
      map?.setView([cityData.location.latitude, cityData.location.longitude], cityData.location.zoom);
    }


  }, [map, mapRef, cityData]);

  return map;
}

export default useLeafletMap;
