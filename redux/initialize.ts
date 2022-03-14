import fetchBusinesses from "./thunks/businesses";
import { AppDispatch } from "./store";
import fetchReviews from "./thunks/review";
import fetchUsers from "./thunks/user";

function initializeRedux(dispatch: AppDispatch) {
  dispatch(fetchBusinesses());
  dispatch(fetchReviews());
  dispatch(fetchUsers());
}

export default initializeRedux;
