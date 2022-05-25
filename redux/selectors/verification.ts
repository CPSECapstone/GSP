import { RootState } from "../store";

const selectAllRequests = (state: RootState) => state.verification.requests;

export default { selectAllRequests };
