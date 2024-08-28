import CommentItem from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';
import { useAppSelector } from '../../hooks';
import { CommentType } from '../../types';
import { selectAutorizationStatus } from '../../store/slices/authorization-slice';
import { AuthorizationStatus } from '../../constants';


type CommentsListProps = {
  comments: CommentType[];
}

function CommentsList({ comments }: CommentsListProps): JSX.Element {

  const isUserAuthorized = useAppSelector(selectAutorizationStatus);

  if (comments !== undefined && comments.length > 0) {
    const arrayToSort = [...comments];
    const sortedCommentList = arrayToSort.sort((first, second) => Number(new Date(second.date)) - Number(new Date(first.date)));

    const list = sortedCommentList.map((comment: CommentType, index) => {
      if (index < 10) {
        return <CommentItem commentData={comment} key={comment.id} />;
      }
    });

    return (
      <section className="offer__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedCommentList.length}</span></h2>
        <ul className="reviews__list">
          {list}
        </ul>
        {isUserAuthorized === AuthorizationStatus.Auth &&
          <CommentForm />}
      </section>
    );
  } else {
    return (
      <span style={{ fontWeight: '700', marginBottom: '30px' }}>
        No comments yet.
      </span >);
  }
}

export default CommentsList;
