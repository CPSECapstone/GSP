import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusinessQueryType } from "../../src/APITypes";

interface BusinessState {
  businesses: BusinessQueryType;
  loading: "idle" | "pending";
}

const initialState: BusinessState = {
  businesses: [],
  loading: "idle",
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    businessLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    businessReceived(state, action: PayloadAction<BusinessQueryType>) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.businesses = action.payload;
      }
    },
  },
});

export const { businessLoading, businessReceived } = businessSlice.actions;

const businessReducer = businessSlice.reducer;
export default businessReducer;
