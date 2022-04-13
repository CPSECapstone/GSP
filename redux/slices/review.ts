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
    addReview(state, action: PayloadAction<ReviewType>) {
      const newArray = [...state.reviews, action.payload];
      state.reviews = newArray;
    },
    editReview(state, action: PayloadAction<ReviewType>) {
      const idx = state.reviews.findIndex((r) => r.id === action.payload.id);
      state.reviews[idx] = action.payload;
    },
    deleteReviewRedux(state, action: PayloadAction<string>) {
      const newArray = state.reviews.filter((r) => r.id !== action.payload);
      state.reviews = newArray;
    },
  },
});

export const {
  reviewsLoading,
  reviewsRecieved,
  addReview,
  editReview,
  deleteReviewRedux,
} = reviewSlice.actions;

const reviewReducer = reviewSlice.reducer;
export default reviewReducer;
