import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import OtherPlaceCard from '../other-place-card/OtherPlaceCard';

type PlacesListProps = {
  offers: Offers;
  reviews: Reviews;
  onListItemHover: (listItemName: string | undefined) => void;
};

function OtherPlacesList ({ offers, reviews, onListItemHover }: PlacesListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <OtherPlaceCard
          offer={offer}
          reviews={reviews}
          onListItemHover={onListItemHover}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default OtherPlacesList;
