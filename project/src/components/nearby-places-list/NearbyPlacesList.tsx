import { Offers } from '../../types/offers';
import NearbyPlaceCard from '../nearby-place-card/NearbyPlaceCard';

type NearbyPlacesListProps = {
  nearbyOffers: Offers;
  onListItemHover: (listItemName: string | undefined) => void;
};

function NearbyPlacesList ({ nearbyOffers, onListItemHover }: NearbyPlacesListProps) {
  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((nearbyOffer) => (
        <NearbyPlaceCard
          nearbyOffer={nearbyOffer}
          onListItemHover={onListItemHover}
          key={nearbyOffer.id}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;