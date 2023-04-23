import { render, screen } from '@testing-library/react';
import { makeMockComment } from '../../utils/mocks';
import Comment from './comment';

describe('Comment component', () => {
  it('should render correctly', () => {
    const mockComment = makeMockComment();

    render(<Comment {...mockComment} />);

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
  });
});
