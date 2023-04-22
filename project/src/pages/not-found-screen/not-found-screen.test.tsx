import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-router/History-Router';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('We are sorry the page you are looking for does not exist.');
    const linkElement = screen.getByText('Return to the main page.');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
