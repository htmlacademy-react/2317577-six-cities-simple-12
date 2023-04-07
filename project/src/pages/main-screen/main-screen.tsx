import { useEffect, useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import { useAppSelector } from '../../hooks/redux';
import PlacesList from '../../components/places-list/PlacesList';
import Logo from '../../components/logo/Logo';
import Map from '../../components/map/Map';
import CitiesList from '../../components/cities-list/CitiesList';
import { cities } from '../../constants/const';

function MainScreen(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const [currentOffers, setCurrentOffers] = useState<Offers>([]);

  const offers: Offers = useAppSelector((state) => state.offers);
  const city: string = useAppSelector((state) => state.currentCity);

  const onListItemHover = (selectedOfferId: number | undefined) => {
    const selectedOffer: Offer | undefined = offers.find((offer: Offer) => offer.id === selectedOfferId);
    setSelectedPoint(selectedOffer);
  };

  const getCurrentOffers = () => {
    const cityOffers = offers.filter((offer: Offer) => offer.city.name === city);
    setCurrentOffers(cityOffers);
  };

  useEffect(() => {
    getCurrentOffers();
  }, [city]);

  return (
    <div className="page page--gray page--main">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
            >
            </path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
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
                  <div className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {`${currentOffers.length} ${
                  currentOffers.length === 1 ? 'place' : 'places'
                } to stay in ${city}`}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              {
                <PlacesList
                  offers={currentOffers}
                  onListItemHover={onListItemHover}
                />
              }
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {currentOffers.length >= 1 && (
                  <Map
                    city={currentOffers[0].city}
                    offers={currentOffers}
                    selectedPoint={selectedPoint}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
