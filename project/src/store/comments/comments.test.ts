import { Comments } from '../../types/comments';
import { makeMockComments } from '../../utils/mocks';
import { fetchCommentsAction } from '../asyncActions';
import { commentsData } from './comments';

const mockComments: Comments = makeMockComments();

describe('Reducer: commentsData', () => {
  it('Without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      {
        comments: [],
        areCommentsLoading: false,
      }
    );
  });

  it('Should make \'areOffersLoadingState\' true', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
    };
    expect(
      commentsData.reducer(state, { type: fetchCommentsAction.pending.type })
    ).toEqual({
      comments: [],
      areCommentsLoading: true,
    });
  });

  it('Should update offers by loading them. And \'areOffersLoading\' = false', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
    };
    expect(
      commentsData.reducer(state, {
        type: fetchCommentsAction.fulfilled.type,
        payload: mockComments,
      })
    ).toEqual({
      comments: mockComments,
      areCommentsLoading: false,
    });
  });
});
