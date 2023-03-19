import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Offer } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { countCommonRating } from '../../utils/utils';

type PlaceCardProps = {
  offer: Offer;
  reviews: Reviews;
};

function PlaceCard({offer, reviews}: PlaceCardProps) {
  const [/*activeCard*/, setActiveCard] = useState<number | null>(null);
  const [placeRating, setPlaceRating] = useState<[number, string]>([0, '0%']);

  const navigate = useNavigate();

  const navigateToRoomPage = () => {
    const path = `offer/${offer.id}`;
    navigate(path);
  };

  useEffect(() => {
    const currentReviews = reviews.filter((review) => review.id === offer.id);
    countCommonRating(currentReviews, setPlaceRating);
  }, [offer.id, reviews]);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => setActiveCard(offer.id)}
      onMouseLeave={() => setActiveCard(null)}
    >
      {offer.premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={offer.pic[0]}
          width="260"
          height="200"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: placeRating[1] }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={navigateToRoomPage}>
          {offer.name}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
