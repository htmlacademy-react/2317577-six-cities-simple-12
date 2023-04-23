import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { City } from '../../types/cities';
import { Offer, Offers } from '../../types/offers';

type MapProps = {
  city: City;
  offers: Offers;
  selectedPoint: Offer | undefined;
};

function Map({ city, offers, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.divIcon({
    html: `
    <svg width='27' height='39' xmlns='http://www.w3.org/2000/svg'><path d='M23.856 17.929a11.733 11.733 0 0 0 1.213-5.196C25.07 6.253 19.816 1 13.336 1c-1.835 0-3.643.44-5.272 1.285C2.444 5.197.248 12.113 3.16 17.733l9.736 18.792a1 1 0 0 0 1.784-.017l9.176-18.58z' fill='#4481C3' stroke='#FFF' stroke-width='2' fill-rule='evenodd'/></svg>
    `,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.divIcon({
    html: `
    <svg width='27' height='39' xmlns='http://www.w3.org/2000/svg'><path d='M23.856 17.929a11.733 11.733 0 0 0 1.213-5.196C25.07 6.253 19.816 1 13.336 1c-1.835 0-3.643.44-5.272 1.285C2.444 5.197.248 12.113 3.16 17.733l9.736 18.792a1 1 0 0 0 1.784-.017l9.176-18.58z' fill='#FF9000' stroke='#FFF' stroke-width='2' fill-rule='evenodd'/></svg>
    `,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                selectedPoint !== undefined && offer.id === selectedPoint.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedPoint, currentCustomIcon, defaultCustomIcon, city]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude]);
    }
  }, [city, map]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
}

export default Map;
