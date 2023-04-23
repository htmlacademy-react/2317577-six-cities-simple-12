import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeCity } from '../../utils/mocks';
import { mockStore } from '../../utils/mockStore';
import CitiesList from './cities-list';
import { cities } from '../../constants/const';

describe('CityList component', () => {
  it ('should display a list of cities from the props', () => {
    const mockCity = makeFakeCity();
    const store = mockStore({CITY: mockCity});

    render(
      <Provider store={store}>
        <CitiesList cities={cities} />
      </Provider>
    );

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    const currentCities = items.map((item) => item.textContent);

    expect(currentCities).toEqual(cities);
  });
});
