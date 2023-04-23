import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeRandomReviewIndex } from '../../utils/mocks';
import { mockStore } from '../../utils/mockStore';
import SendComment from './send-comment';

describe('SendComment component', () => {
  const store = mockStore({
    COMMENTS: {
      comments: [],
      isCommentBeingPosted: false,
      areCommentsLoading: false
    }
  });
  const history = createMemoryHistory();

  const SendCommentComponentWithProvider = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <SendComment hotelId={0} />
      </HistoryRouter>
    </Provider>
  );

  it('should render correctly', () => {
    render(SendCommentComponentWithProvider);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(
      screen.getByText(/To submit review please make sure to set/i)
    ).toBeInTheDocument();
  });

  it('when the fields are filled in correctly, submitButton is not disabled and loginAction is dispatched', async () => {
    const randomReviewIndex = makeRandomReviewIndex();
    render(SendCommentComponentWithProvider);

    const reviewField = screen.getByTestId('review-id');
    const ratingFields = screen.getAllByTestId('rating-id');

    await act(async () =>
      await userEvent.type(
        reviewField,
        'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.'
      )
    );

    expect(
      screen.getByDisplayValue(
        /A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam./i
      )
    ).toBeInTheDocument();

    ratingFields.map((ratingField) => expect(ratingField).not.toBeChecked());
    await act(async () => await userEvent.click(ratingFields[randomReviewIndex]));
    expect(ratingFields[randomReviewIndex]).toBeChecked();

    expect(screen.getByTestId('send-comment-button')).not.toBeDisabled();

    fireEvent.submit(screen.getByTestId('send-comment-form'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('POST_COMMENT/pending');
  });
});
