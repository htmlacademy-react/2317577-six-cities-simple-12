import { Reviews } from "../types/reviews";

export const countCommonRating = (
  reviews: Reviews,
  setPlaceRating: React.Dispatch<React.SetStateAction<[number, string]>>
) => {
  if (reviews.length) {
    let ratings = reviews.map((review) => {
      return review.rating;
    });

    let commonRating =
      ratings.reduce((acc, num) => acc + num, 0) / ratings.length;

    setPlaceRating([commonRating, commonRating * 20 + "%"]);
  }
};
