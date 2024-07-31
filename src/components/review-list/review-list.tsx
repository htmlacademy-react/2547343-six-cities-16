import { ReviewItemType } from '../../types';
import ReviewItem from '../review-item/review-item';
import CommentForm from '../comment-form/comment-form';


type ReviewListProps = {
  reviewsData: ReviewItemType[];
}


function ReviewList({ reviewsData }: ReviewListProps): JSX.Element {

  const list = reviewsData.map((review: ReviewItemType) => <ReviewItem reviewData={review} key={review.id} />);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsData.length}</span></h2>
      <ul className="reviews__list">
        {list}
      </ul>
      <CommentForm />
    </section>
  );
}

export default ReviewList;
