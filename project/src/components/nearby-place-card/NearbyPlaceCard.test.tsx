import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/History-Router';
import { createMemoryHistory } from 'history';
import { makeMockOffer } from '../../utils/mocks';
import { mockStore } from '../../utils/mockStore';
import NearbyPlaceCard from './NearbyPlaceCard';
import { Approute } from '../../constants/const';

describe('NearbyPlaceCard component', () => {
  const mockOffer = makeMockOffer();

  const history = createMemoryHistory();

  const NearbyPlaceCardWithHistoryRouter = (
    <HistoryRouter history={history}>
      <NearbyPlaceCard
        nearbyOffer={mockOffer}
      />
    </HistoryRouter>
  );

  it('should render the nearby offer\'s details properly', () => {
    render(NearbyPlaceCardWithHistoryRouter);

    const imageUrl = mockOffer.images[0];
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
    expect(screen.getByTestId('nearbyplace-card-title').textContent).toEqual(
      mockOffer.title
    );
    expect(screen.getByTestId('nearbyplace-card-price')).toHaveTextContent(
      `${mockOffer.price}`
    );
  });

  it('when title is clicked, redirect to this place', async () => {
    const store = mockStore();

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyPlaceCard nearbyOffer={mockOffer} />
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByText(mockOffer.title)));

    await waitFor(() => {
      expect(history.location.pathname).toBe(`${Approute.Offer}/${mockOffer.id}`);
    });
  });
});
