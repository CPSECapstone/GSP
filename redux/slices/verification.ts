import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VerificationRequestQueryType } from "../../src/APITypes";

interface VerificationState {
  requests: VerificationRequestQueryType;
  loading: "idle" | "pending";
}

const initialState: VerificationState = {
  requests: [],
  loading: "idle",
};

export const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    requestsLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    requestsRecieved(
      state,
      action: PayloadAction<VerificationRequestQueryType>
    ) {
      if (state.loading === "pending") {
        state.requests = action.payload;
        state.loading = "idle";
      }
    },
    deleteRequestRedux(state, action: PayloadAction<string>) {
      const newRequests = state.requests.filter(
        (r) => r!.id !== action.payload
      );
      state.requests = newRequests;
    },
  },
});

export const { requestsLoading, requestsRecieved, deleteRequestRedux } =
  verificationSlice.actions;

const requestReducer = verificationSlice.reducer;
export default requestReducer;
