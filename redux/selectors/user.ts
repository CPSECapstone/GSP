import { RootState } from "../store";

const selectUser = (state: RootState) =>
  state.user.users.find((user) => user?.email === state.user.curUserEmail);

const selectAllUsers = (state: RootState) => state.user.users;

export { selectUser, selectAllUsers };
