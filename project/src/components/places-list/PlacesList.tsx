import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import PlaceCard from '../place-card/PlaceCard';

type PlacesListProps = {
  offers: Offers;
  reviews: Reviews;
  onListItemHover: (listItemName: string | undefined) => void;
};

function PlacesList({ offers, reviews, onListItemHover }: PlacesListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          reviews={reviews}
          onListItemHover={onListItemHover}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default PlacesList;
