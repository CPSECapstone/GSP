import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./slices/business";
import collectionReducer from "./slices/collection";
import notificationsReducer from "./slices/notifications";
import reviewReducer from "./slices/review";
import userReducer from "./slices/user";
import requestReducer from "./slices/verification";

const store = configureStore({
  reducer: {
    business: businessReducer,
    collection: collectionReducer,
    user: userReducer,
    notification: notificationsReducer,
    review: reviewReducer,
    verification: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
