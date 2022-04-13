import { RootState } from "../store";

const selectAllReviews = (state: RootState) => state.review.reviews;
const selectReviewById = (id: string) => (state: RootState) =>
  state.review.reviews.find((review) => review.id === id);
const selectReviewsByUser = (id: string | undefined) => (state: RootState) =>
  state.review.reviews.filter((r) => r.userID === id && id);
const selectReviewsByBusiness =
  (id: string | undefined) => (state: RootState) =>
    state.review.reviews.filter((r) => r.businessID === id && id);

export {
  selectAllReviews,
  selectReviewById,
  selectReviewsByUser,
  selectReviewsByBusiness,
};
