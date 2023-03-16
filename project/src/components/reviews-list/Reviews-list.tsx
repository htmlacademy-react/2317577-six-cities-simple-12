import { Reviews } from "../../types/reviews";
import Review from "../review/Review";

type ReviewsList = {
  reviews: Reviews;
};

function ReviewsList({reviews}: ReviewsList) {
  return (
    <ul className="reviews__list">
      {reviews.map((review, index) => (
        <Review {...review} key={`${review.name}-${index}`} />
      ))}
    </ul>
  );
}

export default ReviewsList;
