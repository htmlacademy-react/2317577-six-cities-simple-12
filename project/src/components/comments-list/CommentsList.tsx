import React from 'react';
import { Comments } from '../../types/comments';
import Comment from '../comment/Comment';

type CommentsListProps = {
  comments: Comments;
};

function CommentsList({comments}: CommentsListProps) {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <Comment {...comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default React.memo(CommentsList);
