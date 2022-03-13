import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../src/APITypes";

interface UserState {
  user: UserType;
  loading: "idle" | "pending";
}

const initialState: UserState = {
  user: undefined,
  loading: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    userRecieved(state, action: PayloadAction<UserType>) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.user = action.payload;
      }
    },
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
  },
});

export const { userLoading, userRecieved, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
