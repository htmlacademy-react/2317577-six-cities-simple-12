import { Offers } from '../../types/offers';
import NearbyPlaceCard from '../nearby-place-card/NearbyPlaceCard';

type NearbyPlacesListProps = {
  nearbyOffers: Offers;
};

function NearbyPlacesList ({ nearbyOffers }: NearbyPlacesListProps) {
  return (
    <div className="near-places__list places__list" data-testid='nearbyplaces-list'>
      {nearbyOffers.map((nearbyOffer) => (
        <NearbyPlaceCard
          nearbyOffer={nearbyOffer}
          key={nearbyOffer.id}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
