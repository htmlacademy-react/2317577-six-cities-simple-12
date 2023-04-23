import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { mockStore } from '../../utils/mockStore';
import { makeMockUser } from '../../utils/mocks';
import { AuthorizationStatus } from '../../constants/const';
import Header from './header';

describe('Header component', () => {
  describe('authorization status is Auth', () => {
    const mockUser = makeMockUser();
    const store = mockStore({
      USER: {
        userInfo: mockUser,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const history = createMemoryHistory();
    it('email and sign out function are shown', () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });

    it('when the user signs out, logoutAction is dispatched', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      await userEvent.click(screen.getByText('Sign out'));

      const actions = store.getActions();
      expect(actions[0].type).toBe('LOGOUT/pending');
    });
  });

  describe('authorization status is NoAuth', () => {
    const store = mockStore({
      USER: {
        userInfo: undefined,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    const history = createMemoryHistory();
    it('\'Sing in\' is shown', () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });

    it('when the user clicks sign in, the user is redirected to Login page', async () => {
      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      await act(async () => await userEvent.click(screen.getByText('Sign in')));

      await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
      });
    });
  });
});
