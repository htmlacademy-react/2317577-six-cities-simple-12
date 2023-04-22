import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/History-Router';
import { createMemoryHistory } from 'history';
import { makeMockOffer } from '../../utils/mocks';
import { mockStore } from '../../utils/mockStore';
import NearbyPlaceCard from './NearbyPlaceCard';

describe('NearbyPlaceCard component', () => {
  const listItemHoverFn = jest.fn();
  const mockOffer = makeMockOffer();

  const history = createMemoryHistory();

  const NearbyPlaceCardWithHistoryRouter = (
    <HistoryRouter history={history}>
      <NearbyPlaceCard
        nearbyOffer={mockOffer}
        onListItemHover={listItemHoverFn}
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

  it('when component is hovered, onListItemHover is called with the offer id', () => {
    render(NearbyPlaceCardWithHistoryRouter);

    fireEvent.mouseEnter(screen.getByTestId('nearbyplace-container'));

    expect(listItemHoverFn).toBeCalled();
    expect(listItemHoverFn).nthCalledWith(1, mockOffer.id);
  });

  it('when component is unhovered, onListItemHover is called with undefined', () => {
    render(NearbyPlaceCardWithHistoryRouter);

    fireEvent.mouseLeave(screen.getByTestId('nearbyplace-container'));

    expect(listItemHoverFn).toBeCalled();
    expect(listItemHoverFn).nthCalledWith(1, undefined);
  });

  it('when title is clicked, redirect to this place', async () => {
    const store = mockStore();

    render (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyPlaceCard nearbyOffer={mockOffer} onListItemHover={listItemHoverFn}/>
        </HistoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.click(screen.getByText(mockOffer.title)));

    await waitFor(() => {
      expect(history.location.pathname).toBe(`/offer/${mockOffer.id}`);
    });
  });
});
