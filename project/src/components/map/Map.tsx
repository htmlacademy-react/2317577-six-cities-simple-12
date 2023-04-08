import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constants/const';
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

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
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
