import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Business } from "../../src/API";
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
    updateBusiness(state, action: PayloadAction<Business>) {
      const index = state.businesses.findIndex(
        (business) => business!.id === action.payload.id
      );
      const newArray = [...state.businesses];
      newArray[index] = action.payload;
      state.businesses = newArray;
    },
  },
});

export const { businessLoading, businessReceived, updateBusiness } =
  businessSlice.actions;

const businessReducer = businessSlice.reducer;
export default businessReducer;
