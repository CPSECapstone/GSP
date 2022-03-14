import { RootState } from "../store";

const selectAllReviews = (state: RootState) => state.review.reviews;
const selectReviewsByUser = (id: string | undefined) => (state: RootState) =>
  state.review.reviews.filter((r) => r.userID === id && id);
const selectReviewsByBusiness =
  (id: string | undefined) => (state: RootState) =>
    state.review.reviews.filter((r) => r.businessID === id && id);

export { selectAllReviews, selectReviewsByUser, selectReviewsByBusiness };
