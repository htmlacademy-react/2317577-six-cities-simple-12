import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { mockStore } from '../../utils/mockStore';
import { createMemoryHistory } from 'history';
import Room from './room';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../constants/const';
import { makeMockOffer } from '../../utils/mocks';

describe('Room screen', () => {
  const mockOffer = makeMockOffer();

  const store = mockStore({
    OFFERS: {
      singleOffer: mockOffer,
      isSingleOfferLoading: false,
      nearbyOffers: [],
    },
    USER: {
      userInfo: undefined,
      authorizationStatus: AuthorizationStatus.NoAuth,
    },
    COMMENTS: {
      comments: [],
    },
  });
  const history = createMemoryHistory();

  const RoomWithProvider = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Room />
      </HistoryRouter>
    </Provider>
  );

  it('should render the selected offer correctly', () => {
    render(RoomWithProvider);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
  });
});
