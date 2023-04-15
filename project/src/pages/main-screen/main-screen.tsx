import { useEffect, useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import { useAppSelector } from '../../hooks/redux';
import PlacesList from '../../components/places-list/PlacesList';
import Map from '../../components/map/Map';
import CitiesList from '../../components/cities-list/CitiesList';
import { cities } from '../../constants/const';
import Header from '../../components/header/Header';
import { getFilterOptions, getOffers } from '../../store/offers/selectors';
import { getCurrentCity } from '../../store/city/selectors';
import OptionsList from '../../components/options-list/OptionsList';

function MainScreen(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );
  const [currentOffers, setCurrentOffers] = useState<Offers>([]);

  const offers: Offers = useAppSelector(getOffers);
  const city: string = useAppSelector(getCurrentCity);
  const sortOption = useAppSelector(getFilterOptions);

  const onListItemHover = (selectedOfferId: number | undefined) => {
    const selectedOffer: Offer | undefined = offers.find((offer: Offer) => offer.id === selectedOfferId);
    setSelectedPoint(selectedOffer);
  };

  const getCurrentOffers = (type: 'price' | 'rating', order: 'asc' | 'desc') => {
    const cityOffers = offers.filter((offer: Offer) => offer.city.name === city)
      .sort((a, b) => {
        if (order === 'asc') {
          return a[type] - b[type];
        } else {
          return b[type] - a[type];
        }
      });
    setCurrentOffers(cityOffers);
  };

  useEffect(() => {
    getCurrentOffers(sortOption.type, sortOption.order);
  }, [city, sortOption]);

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

      <Header />

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
              {<OptionsList />}
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
