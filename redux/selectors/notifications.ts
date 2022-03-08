import { RootState } from "../store";

const selectAllUserNotifs = (state: RootState) =>
  state.notification.notifications;

export default selectAllUserNotifs;
