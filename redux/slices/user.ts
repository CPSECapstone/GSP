import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../src/APITypes";

interface UserState {
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
      }
    },
    setUser(state, action: PayloadAction<string | undefined>) {
      state.curUserEmail = action.payload;
    },
  },
});

export const { userLoading, userRecieved, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
