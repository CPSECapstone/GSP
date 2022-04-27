// @ts-nocheck
import { test, expect, describe } from "@jest/globals";
import { selectAllUsers, selectUser } from "../redux/selectors/user";
import userReducer, {
  setUser,
  userLoading,
  userRecieved,
  UserState,
} from "../redux/slices/user";

// testing data
const initialState: UserState = {
  users: [],
  curUserEmail: undefined,
  loading: "idle",
};

const user1 = {
  id: "1111",
  email: "test1@email.com",
};
const user2 = {
  id: "2222",
  email: "test2@email.com",
};
const user3 = {
  id: "3333",
  email: "test3@email.com",
};

const fullState: UserState = {
  users: [user1, user2],
  curUserEmail: user1.email,
  loading: "idle",
};

const reduxFullState = {
  user: fullState,
};

// selector tests
describe("selectUser when", () => {
  test("curUserEmail is defined", () => {
    const curUser = selectUser(reduxFullState);
    expect(curUser).toEqual(user1);
  });
  test("curUserEmail is undefined", () => {
    const modifiedState = { user: { ...fullState, curUserEmail: undefined } };
    const curUser = selectUser(modifiedState);
    expect(curUser).toBeUndefined();
  });
});

describe("selectAllUsers when", () => {
  test("users are populated", () => {
    const curUsers = selectAllUsers(reduxFullState);
    expect(curUsers).toEqual([user1, user2]);
  });
  test("users is empty", () => {
    const modifiedState = { user: initialState };
    const curUsers = selectAllUsers(modifiedState);
    expect(curUsers).toEqual([]);
  });
});

// reducer tests
test("userLoading", () => {
  const curState = userReducer(initialState, userLoading());
  expect(curState).toEqual({
    ...initialState,
    loading: "pending",
  });
});

describe("userRecieved when", () => {
  test("users array is empty", () => {
    const modifiedState = { ...initialState, loading: "pending" };
    const curState = userReducer(modifiedState, userRecieved([user1, user2]));
    expect(curState.users).toEqual([user1, user2]);
    expect(curState.curUserEmail).toBeUndefined();
    expect(curState.loading).toEqual("idle");
  });
  test("users array is full", () => {
    const modifiedState = { ...fullState, loading: "pending" };
    const curState = userReducer(modifiedState, userRecieved([user3]));
    expect(curState.users).toEqual([user3]);
    expect(curState.curUserEmail).toBe(fullState.curUserEmail);
    expect(curState.loading).toEqual("idle");
  });
  test("not pending", () => {
    expect(() => userReducer(fullState, userRecieved([user3]))).toThrowError();
  });
});

describe("setUser when", () => {
  test("setting to an existing email", () => {
    const curState = userReducer(fullState, setUser(user1.email));
    expect(curState.curUserEmail).toEqual(user1.email);
  });
  test("setting to an nonexistant email", () => {
    // user3 isn't in fullState
    expect(() => userReducer(fullState, setUser(user3.email))).toThrowError();
  });
  test("setting to undefined", () => {
    const curState = userReducer(fullState, setUser(undefined));
    expect(curState.curUserEmail).toEqual(undefined);
  });
});
