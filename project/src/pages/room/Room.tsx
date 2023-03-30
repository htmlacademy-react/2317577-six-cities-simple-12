import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Offer, Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { countCommonRating } from '../../utils/utils';
import { Approute } from '../../constants/const';
import { Link } from 'react-router-dom';
import SendComment from '../../components/send-comment/SendComment';
import ReviewsList from '../../components/reviews-list/Reviews-list';
import Logo from '../../components/logo/Logo';

type RoomProps = {
  offers: Offers;
  reviews: Reviews;
};

function Room({ offers, reviews }: RoomProps) {
  const { id } = useParams();

  const [place, setPlace] = useState<Offer>();
  const [placeReviews, setPlaceReviews] = useState<Reviews>([]);
  const [placeRating, setPlaceRating] = useState<[number, string]>([0, '0%']);

  useEffect(() => {
    const currentPlace = offers.filter((offer) => offer.id === Number(id))[0];
    setPlace(currentPlace);

    const currentReviews = reviews.filter((review) => review.id === Number(id));
    setPlaceReviews(currentReviews);

    countCommonRating(currentReviews, setPlaceRating);
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

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={Approute.Main}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {place && placeReviews && placeRating && (
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {place.pic.map((pic) => (
                  <div className="property__image-wrapper" key={pic}>
                    <img
                      className="property__image"
                      src={pic}
                      alt={place.name}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {place.premium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{place.name}</h1>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: placeRating[1] }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {placeRating[0]}
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
                    Max {place.adults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{place.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {place.conveniences.map((convenience) => (
                      <li className="property__inside-item" key={convenience}>
                        {convenience}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper ${
                        place.hostPro ? 'property__avatar-wrapper--pro' : ''
                      } user__avatar-wrapper`}
                    >
                      <img
                        className="property__avatar user__avatar"
                        src="img/avatar-angelina.jpg"
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{place.host}</span>
                    {place.hostPro && (
                      <span className="property__user-status">Pro</span>
                    )}
                  </div>
                  <div className="property__description">
                    {place.description.map((paragraph, index) => (
                      <p className="property__text" key={paragraph.slice(0, 10)}>
                        {paragraph}
                      </p>
                    ))}
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
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={Approute.Main}>
                      <img
                        className="place-card__image"
                        src="img/room.jpg"
                        width="260"
                        height="200"
                        alt="Wood and stone place"
                      />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;80</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: '80%' }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={Approute.Main}>
                        Wood and stone place
                      </Link>
                    </h2>
                    <p className="place-card__type">Private room</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={Approute.Main}>
                      <img
                        className="place-card__image"
                        src="img/apartment-02.jpg"
                        width="260"
                        height="200"
                        alt="Canal View Prinsengracht"
                      />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;132</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: '80%' }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={Approute.Main}>
                        Canal View Prinsengracht
                      </Link>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>

                <article className="near-places__card place-card">
                  <div className="place-card__mark">
                    <span>Premium</span>
                  </div>
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={Approute.Main}>
                      <img
                        className="place-card__image"
                        src="img/apartment-03.jpg"
                        width="260"
                        height="200"
                        alt="Nice, cozy, warm big bed apartment"
                      />
                    </Link>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;180</b>
                        <span className="place-card__price-text">
                          &#47;&nbsp;night
                        </span>
                      </div>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: '100%' }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={Approute.Main}>Nice, cozy, warm big bed apartment</Link>
                    </h2>
                    <p className="place-card__type">Apartment</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default Room;
