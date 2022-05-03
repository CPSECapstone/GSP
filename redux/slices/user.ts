import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../src/APITypes";

export interface UserState {
  users: UserType[];
  curUserEmail: string | undefined;
  loading: "idle" | "pending";
}

const initialState: UserState = {
  users: [],
  curUserEmail: undefined,
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
    userRecieved(state, action: PayloadAction<UserType[]>) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.users = action.payload;
      } else {
        throw new Error("userLoading must be called before userRecieved");
      }
    },
    setUser(state, action: PayloadAction<string | undefined>) {
      if (
        action.payload === undefined ||
        state.users.some((u) => u.email === action.payload)
      ) {
        state.curUserEmail = action.payload;
      } else {
        throw new Error("No user has the provided email");
      }
    },
  },
});

export const { userLoading, userRecieved, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
