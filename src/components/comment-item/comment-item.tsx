
import { CommentType } from '../../types';
import { formatRating } from '../../utils';

type CommentItemProps = {
  commentData: CommentType;
}

const formatDateToString = (date: Date) => `${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;

function CommentItem({ commentData }: CommentItemProps): JSX.Element {
  const ratingInStarsFormat: string = formatRating(commentData.rating);
  const commentDate = new Date(commentData.date);
  const dateLabel = formatDateToString(commentDate);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={commentData.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {commentData.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingInStarsFormat}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {commentData.comment}
        </p>
        <time className="reviews__time" dateTime={commentData.date}>{dateLabel}</time>
      </div>
    </li>
  );
}

export default CommentItem;
