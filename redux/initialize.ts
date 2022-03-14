import fetchBusinesses from "./thunks/businesses";
import { AppDispatch } from "./store";
import fetchReviews from "./thunks/review";

function initializeRedux(dispatch: AppDispatch) {
  dispatch(fetchBusinesses());
  dispatch(fetchReviews());
}

export default initializeRedux;
