import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewType } from "../../src/APITypes";

interface ReviewState {
  reviews: ReviewType[];
  loading: "idle" | "pending";
}

const initialState: ReviewState = {
  reviews: [],
  loading: "idle",
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reviewsLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    reviewsRecieved(state, action: PayloadAction<ReviewType[]>) {
      if (state.loading === "pending") {
        state.reviews = action.payload;
        state.loading = "idle";
      }
    },
  },
});

export const { reviewsLoading, reviewsRecieved } = reviewSlice.actions;

const reviewReducer = reviewSlice.reducer;
export default reviewReducer;
