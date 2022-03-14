import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationQueryType } from "../../src/APITypes";

interface NotificationState {
  notifications: NotificationQueryType;
  loading: "idle" | "pending";
}

const initialState: NotificationState = {
  notifications: [],
  loading: "idle",
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationsLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    notificationsRecieved(state, action: PayloadAction<NotificationQueryType>) {
      if (state.loading === "pending") {
        state.notifications = action.payload;
        state.loading = "idle";
      }
    },
    notificationRemoval(state, action: PayloadAction<string>) {
      const newState = state.notifications.filter(
        (n) => n?.id !== action.payload
      );
      state.notifications = newState;
    },
  },
});

export const {
  notificationsLoading,
  notificationsRecieved,
  notificationRemoval,
} = notificationSlice.actions;

const notificationsReducer = notificationSlice.reducer;
export default notificationsReducer;
