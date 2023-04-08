import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router';
import { Offer, Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { countCurrrentRating } from '../../utils/utils';
import SendComment from '../../components/send-comment/SendComment';
import ReviewsList from '../../components/reviews-list/Reviews-list';
import Map from '../../components/map/Map';
import OtherPlacesList from '../../components/other-places-list/OtherPlacesList';
import Header from '../../components/header/Header';

type RoomProps = {
  reviews: Reviews;
};

function Room({ reviews }: RoomProps) {
  const { id } = useParams();

  const [place, setPlace] = useState<Offer>();
  const [placeReviews, setPlaceReviews] = useState<Reviews>([]);
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const [nearbyPlaces, setNearbyPlaces] = useState<Offers>([]);

  const offers = useAppSelector((state) => state.offers);

  const onListItemHover = (listItemName: string | undefined) => {
    setSelectedPoint(offers.find((offer: Offer) => offer.title === listItemName));
  };

  useEffect(() => {
    const currentPlace = offers.filter((offer) => offer.id === Number(id))[0];
    setPlace(currentPlace);

    const currentReviews = reviews.filter((review) => review.id === Number(id));
    setPlaceReviews(currentReviews);

    const nearbyOffers = offers.filter((offer: Offer) => offer.id !== Number(id) && offer.city.name === currentPlace.city.name);
    setNearbyPlaces(nearbyOffers);
  }, [id, offers, reviews]);

  return (
    <div className="page">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id='icon-arrow-select' viewBox='0 0 7 4'>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <Header />

      {place && placeReviews && (
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {place.images.map((image, index) => (
                  <div className="property__image-wrapper" key={index.toString()}>
                    <img
                      className="property__image"
                      src={image}
                      alt={place.title}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {place.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{place.title}</h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: countCurrrentRating(place.rating) }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {place.rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {place.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {place.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {place.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{place.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {place.goods.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper ${
                        place.host.isPro ? 'property__avatar-wrapper--pro' : ''
                      } user__avatar-wrapper`}
                    >
                      <img
                        className="property__avatar user__avatar"
                        src={place.host.avatarUrl}
                        width="74"
                        height="74"
                        alt={place.host.name}
                      />
                    </div>
                    <span className="property__user-name">{place.host.name}</span>
                    {place.host.isPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    <p className="property__text" key={place.description.slice(0, 10)}>
                      {place.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews &middot;{' '}
                    <span className="reviews__amount">
                      {placeReviews.length}
                    </span>
                  </h2>
                  {<ReviewsList reviews={placeReviews} />}
                  {<SendComment />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {offers && (
                <Map
                  city={offers[0].city}
                  offers={offers.filter((offer: Offer) => offer.title !== place.title)}
                  selectedPoint={selectedPoint}
                />
              )}
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              {nearbyPlaces.length &&
                (
                  <OtherPlacesList
                    offers={nearbyPlaces}
                    onListItemHover={onListItemHover}
                  />
                )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default Room;
