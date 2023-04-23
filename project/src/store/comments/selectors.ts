import { NameSpace } from '../../constants/const';
import { Comments } from '../../types/comments';
import { State } from '../../types/state';

export const getComments = (state: State): Comments => state[NameSpace.Comments].comments;
export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.Comments].areCommentsLoading;
export const getPostLoadingStatus = (state: State): boolean => state[NameSpace.Comments].isCommentBeingPosted;
