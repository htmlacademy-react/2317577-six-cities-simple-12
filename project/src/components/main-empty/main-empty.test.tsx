import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/mockStore';
import { makeFakeCity } from '../../utils/mocks';
import MainEmpty from './main-empty';

describe('MainEmpty Component', () => {
  const mockCity = makeFakeCity();

  const store = mockStore({ CITY: mockCity });

  const MainComponentWithProvider = (
    <Provider store={store}>
      <MainEmpty />
    </Provider>
  );

  it('should render correctly', () => {
    render(MainComponentWithProvider);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-offers-city').textContent).toEqual(
      `We could not find any property available at the moment in ${mockCity.currentCity}`
    );
  });
});
