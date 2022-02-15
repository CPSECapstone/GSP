import fetchBusinesses from "./thunks/businesses";
import { AppDispatch } from "./store";

function initializeRedux(dispatch: AppDispatch) {
  dispatch(fetchBusinesses);
}

export default initializeRedux;
