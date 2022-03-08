import { RootState } from "../store";

const selectUser = (state: RootState) => state.user.user;

export default selectUser;
