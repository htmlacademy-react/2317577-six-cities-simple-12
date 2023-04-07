import { Offers } from '../../types/offers';
import OtherPlaceCard from '../other-place-card/OtherPlaceCard';

type PlacesListProps = {
  offers: Offers;
  onListItemHover: (listItemName: string | undefined) => void;
};

function OtherPlacesList ({ offers, onListItemHover }: PlacesListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <OtherPlaceCard
          offer={offer}
          onListItemHover={onListItemHover}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default OtherPlacesList;
