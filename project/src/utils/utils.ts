import { Reviews } from '../types/reviews';

export const countCommonRating = (
  reviews: Reviews,
  setPlaceRating: React.Dispatch<React.SetStateAction<[number, string]>>
) => {
  if (reviews.length) {
    const ratings = reviews.map((review) => review.rating);

    const commonRating =
      ratings.reduce((acc, num) => acc + num, 0) / ratings.length;

    setPlaceRating([commonRating, `${commonRating * 20}%`]);
  }
};
