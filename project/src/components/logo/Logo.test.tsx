import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

describe('Logo component', () => {
  const history = createMemoryHistory();
  it('Logo image should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('when user clicks Logo, the user is redirected to Main page', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<h1>This is main page</h1>} />
          <Route path='*' element={<Logo />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByRole('link')));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
