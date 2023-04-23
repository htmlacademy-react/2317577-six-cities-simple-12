import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  onListItemHover: (selectedOfferId: number | undefined) => void;
};

function PlacesList({ offers, onListItemHover }: PlacesListProps) {
  return (
    <div className="cities__places-list places__list tabs__content" data-testid='places-list'>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          onListItemHover={onListItemHover}
          key={offer.id}
        />
      ))}
    </div>
  );
}

export default PlacesList;
