import { Link } from 'react-router-dom';
import { Approute } from '../../constants/const';
import { Offer } from '../../types/offers';
import { countCurrrentRating } from '../../utils/utils';

type NearbyPlaceCardProps = {
  nearbyOffer: Offer;
}

function NearbyPlaceCard({nearbyOffer}: NearbyPlaceCardProps) {
  return (
    <article className="near-places__card place-card"
      data-testid='nearbyplace-container'
    >
      {nearbyOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={nearbyOffer.images[0]}
          width="260"
          height="200"
          alt={nearbyOffer.title}
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value" data-testid='nearbyplace-card-price'>&euro;{nearbyOffer.price}</b>
            <span className="place-card__price-text">
              &#47;&nbsp;night
            </span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: countCurrrentRating(nearbyOffer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${Approute.Offer}/${nearbyOffer.id}`} data-testid='nearbyplace-card-title'>{nearbyOffer.title}</Link>
        </h2>
        <p className="place-card__type">{nearbyOffer.type}</p>
      </div>
    </article>
  );
}


export default NearbyPlaceCard;
