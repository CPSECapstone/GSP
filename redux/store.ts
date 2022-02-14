import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./slices/business";
import collectionReducer from "./slices/collection";

const store = configureStore({
  reducer: {
    business: businessReducer,
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
