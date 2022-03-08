import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./slices/business";
import collectionReducer from "./slices/collection";
import notificationsReducer from "./slices/notifications";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    business: businessReducer,
    collection: collectionReducer,
    user: userReducer,
    notification: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
