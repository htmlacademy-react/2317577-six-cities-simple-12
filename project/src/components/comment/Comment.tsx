import {Comment as CommentType} from '../../types/comments';

function Comment({comment, user, rating, date}: CommentType) {
  const countRating = () => `${rating * 20}%`;

  const parseDate = () => {
    const currentDate = new Date(date);
    const month = currentDate.toLocaleString('default', { month: 'long' });
    return `${month} ${currentDate.getFullYear()}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: countRating() }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          {parseDate()}
        </time>
      </div>
    </li>
  );
}

export default Comment;
