import { render, screen } from '@testing-library/react';
import OptionsList from './OptionsList';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/mockStore';
import { makeMockFilterOptions } from '../../utils/mocks';

describe('OptionsList component', () => {
  const mockFilterOptions = makeMockFilterOptions();
  const store = mockStore({OFFERS: {filterOptions: mockFilterOptions}});

  const OptionsListWithProvider = (
    <Provider store={store}>
      <OptionsList />
    </Provider>
  );

  it('should display active filter options', () => {
    render(OptionsListWithProvider);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('active-filter-option').textContent).toEqual(mockFilterOptions.name);
  });
});
