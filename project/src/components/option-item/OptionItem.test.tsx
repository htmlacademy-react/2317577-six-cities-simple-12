import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockStore } from '../../utils/mockStore';
import { makeMockFilterOptions } from '../../utils/mocks';
import OptionItem from './OptionItem';

describe('OptionItem compoment', () => {
  const store = mockStore();
  const mockFilterOptions = makeMockFilterOptions();

  const OptionItemWithProvider = (
    <Provider store={store}>
      <OptionItem
        name={mockFilterOptions.name}
        type={mockFilterOptions.type}
        order={mockFilterOptions.order}
      />
    </Provider>
  );

  it('should display filter option name from props', () => {
    render(OptionItemWithProvider);

    expect(screen.getByText(mockFilterOptions.name)).toBeInTheDocument();
  });

  it('when user clicks certain filter option, setFilterOption action is dispached', async () => {
    render(OptionItemWithProvider);

    await act(async () => await userEvent.click(screen.getByText(mockFilterOptions.name)));

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/setFilterOptions');
  });
});
