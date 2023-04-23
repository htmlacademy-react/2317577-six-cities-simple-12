import { Comments } from '../../types/comments';
import { makeMockComments } from '../../utils/mocks';
import { fetchCommentsAction, postCommentAction } from '../asyncActions';
import { commentsData } from './comments';

const mockComments: Comments = makeMockComments();

describe('Reducer: commentsData', () => {
  it('Without additional parameters should return initial state', () => {
    expect(commentsData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      {
        comments: [],
        areCommentsLoading: false,
        isCommentBeingPosted: false,
      }
    );
  });

  it('Should make \'areOffersLoadingState\' true', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
      isCommentBeingPosted: false,
    };
    expect(
      commentsData.reducer(state, { type: fetchCommentsAction.pending.type })
    ).toEqual({
      comments: [],
      areCommentsLoading: true,
      isCommentBeingPosted: false,
    });
  });

  it('Should update offers by loading them. And \'areOffersLoading\' = false', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
      isCommentBeingPosted: false,
    };
    expect(
      commentsData.reducer(state, {
        type: fetchCommentsAction.fulfilled.type,
        payload: mockComments,
      })
    ).toEqual({
      comments: mockComments,
      areCommentsLoading: false,
      isCommentBeingPosted: false,
    });
  });

  it('Should make \'isCommentBeingPosted\' true', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
      isCommentBeingPosted: false,
    };
    expect(
      commentsData.reducer(state, { type: postCommentAction.pending.type })
    ).toEqual({
      comments: [],
      areCommentsLoading: false,
      isCommentBeingPosted: true,
    });
  });

  it('Should update offers after posting an offer. And \'isCommentBeingPosted\' = false', () => {
    const state = {
      comments: [],
      areCommentsLoading: false,
      isCommentBeingPosted: true,
    };
    expect(
      commentsData.reducer(state, {
        type: postCommentAction.fulfilled.type,
        payload: mockComments,
      })
    ).toEqual({
      comments: mockComments,
      areCommentsLoading: false,
      isCommentBeingPosted: false,
    });
  });
});
