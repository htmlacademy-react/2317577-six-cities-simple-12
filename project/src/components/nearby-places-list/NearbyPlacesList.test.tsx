import { render, screen, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/History-Router';
import { makeMockOffers } from '../../utils/mocks';
import NearbyPlacesList from './NearbyPlacesList';

describe('NearbyPlacesList component', () => {
  const mockOffers = makeMockOffers();
  const history = createMemoryHistory();

  it('should render offers in list items that receive from props', () => {
    render(
      <HistoryRouter history={history}>
        <NearbyPlacesList
          nearbyOffers={mockOffers}
        />
      </HistoryRouter>
    );

    const list = screen.getByTestId('nearbyplaces-list');
    const items = within(list).getAllByTestId('nearbyplace-container');

    expect(items.length).toEqual(mockOffers.length);
  });
});
