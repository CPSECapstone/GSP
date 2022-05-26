// @ts-nocheck
import { test, expect, describe } from "@jest/globals";
import selectAllUserNotifs from "../redux/selectors/notifications";
import notificationsReducer, {
  notificationRemoval,
  notificationsLoading,
  notificationsRecieved,
  NotificationState,
} from "../redux/slices/notifications";

// testing data
const initialState: NotificationState = {
  notifications: [],
  loading: "idle",
};

const notif1 = {
  id: "1111",
};
const notif2 = {
  id: "2222",
};
const notif3 = {
  id: "3333",
};

const fullState: NotificationState = {
  notifications: [notif1, notif2],
  loading: "idle",
};

const reduxFullState = {
  notification: fullState,
};

describe("selectAllUserNotifs when", () => {
  test("notifs are populated", () => {
    const userNotifs = selectAllUserNotifs(reduxFullState);
    expect(userNotifs).toEqual([notif1, notif2]);
  });
  test("notifs are empty", () => {
    const modifiedState = { notification: initialState };
    const userNotifs = selectAllUserNotifs(modifiedState);
    expect(userNotifs).toEqual([]);
  });
});

// reducer tests
test("notificationsLoading", () => {
  const curState = notificationsReducer(initialState, notificationsLoading());
  expect(curState).toEqual({
    ...initialState,
    loading: "pending",
  });
});

describe("notificationsReceived when", () => {
  test("notifs array is empty", () => {
    const modifiedState = { ...initialState, loading: "pending" };
    const curState = notificationsReducer(
      modifiedState,
      notificationsRecieved([notif1, notif2])
    );
    expect(curState.notifications).toEqual([notif1, notif2]);
    expect(curState.loading).toEqual("idle");
  });
  test("notifs array is full", () => {
    const modifiedState = { ...fullState, loading: "pending" };
    const curState = notificationsReducer(
      modifiedState,
      notificationsRecieved([notif3])
    );
    expect(curState.notifications).toEqual([notif3]);
    expect(curState.loading).toEqual("idle");
  });
});

describe("notificationsRemoval when", () => {
  test("removing an exisiting notification", () => {
    const curState = notificationsReducer(
      fullState,
      notificationRemoval(notif2.id)
    );
    expect(curState.notifications).toEqual([notif1]);
  });
});
