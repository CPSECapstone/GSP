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
    addBusiness(state, action: PayloadAction<Business>) {
      const newArray = [...state.businesses, action.payload];
      state.businesses = newArray;
    },
    updateBusinessRedux(state, action: PayloadAction<Business>) {
      const index = state.businesses.findIndex(
        (business) => business!.id === action.payload.id
      );
      const newArray = [...state.businesses];
      newArray[index] = action.payload;
      state.businesses = newArray;
    },
    deleteBusiness(state, action: PayloadAction<string>) {
      const index = state.businesses.findIndex(
        (business) => business!.id === action.payload
      );
      const newArray = [...state.businesses];
      newArray.splice(index, 1);
      state.businesses = newArray;
    },
  },
});

export const {
  businessLoading,
  businessReceived,
  addBusiness,
  updateBusinessRedux,
  deleteBusiness,
} = businessSlice.actions;

const businessReducer = businessSlice.reducer;
export default businessReducer;
