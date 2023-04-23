import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants/const';
import { CommentsData } from '../../types/state';
import { fetchCommentsAction, postCommentAction } from '../asyncActions';
import { Comments } from '../../types/comments';

const initialState: CommentsData = {
  comments: [],
  areCommentsLoading: false,
  isCommentBeingPosted: false,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.areCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action: PayloadAction<Comments>) => {
        state.comments = action.payload.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
        state.areCommentsLoading = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentBeingPosted = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action: PayloadAction<Comments>) => {
        state.comments = action.payload.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
        state.isCommentBeingPosted = false;
      });
  },
});
