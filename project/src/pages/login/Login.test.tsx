import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/mockStore';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/History-Router';
import Login from './Login';

describe('Login component', () => {
  const store = mockStore();
  const history = createMemoryHistory();

  const LoginComponentWithProvider = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Login />
      </HistoryRouter>
    </Provider>
  );

  it('the values that the user fills in the fields should be displayed in the form fields', async () => {
    render(LoginComponentWithProvider);

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'user@gmail.com'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '123456a'));

    expect(screen.getByDisplayValue(/user@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('submit is not disabled when the fields are filled in correctly, submit dispatches loginAction', async () => {
    render(LoginComponentWithProvider);

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'user@gmail.com'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '123456a'));

    fireEvent.submit(screen.getByTestId('signin-form'));

    expect(screen.getByTestId('signin-button')).not.toBeDisabled();

    const actions = store.getActions();

    expect(actions[0].type).toBe('LOGIN/pending');
  });
});
