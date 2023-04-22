import { render, screen } from '@testing-library/react';
import { mockStore } from '../../utils/mockStore';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/History-Router';
import { createMemoryHistory } from 'history';
import MainScreen from './main-screen';
import {
  makeFakeCity,
  makeMockFilterOptions,
  makeMockOffers,
} from '../../utils/mocks';
import { AuthorizationStatus } from '../../constants/const';

describe('Main screen', () => {
  const mockOffers = makeMockOffers();
  const mockFilterOptions = makeMockFilterOptions();

  const history = createMemoryHistory();

  it('component should render correctly', () => {
    const store = mockStore({
      OFFERS: {
        offers: mockOffers,
        filterOptions: mockFilterOptions,
      },
      CITY: {
        currentCity: mockOffers[0].city.name
      },
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('when the offers for the certain city are empty, MainEmpty component is rendered', () => {
    const mockCity = makeFakeCity();
    const store = mockStore({
      OFFERS: {
        offers: [],
        filterOptions: mockFilterOptions,
      },
      CITY: mockCity,
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(
        `We could not find any property available at the moment in ${mockCity.currentCity}`
      )
    ).toBeInTheDocument();
  });
});
