import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('Loading page', () => {
  it('component should render correctly', () => {
    render(<LoadingScreen />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
