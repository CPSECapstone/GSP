import { API } from "aws-amplify";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import {
  notificationsLoading,
  notificationsRecieved,
} from "../slices/notifications";
import { AppDispatch, RootState } from "../store";
import { listNotifications } from "../../src/graphql/queries";
import notEmpty from "./helper";
import { ListNotificationsQuery } from "../../src/API";

const fetchNotifications =
  (currentUserID: string): ThunkAction<void, RootState, undefined, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(notificationsLoading());

    const res = (await API.graphql({
      query: listNotifications,
      variables: { filter: { userID: { eq: currentUserID } } },
    })) as {
      data: ListNotificationsQuery;
    };
    const notifs = res?.data?.listNotifications?.items ?? [];
    const noNullNotifs = notifs.filter(notEmpty);
    dispatch(notificationsRecieved(noNullNotifs));
  };

export default { fetchNotifications };
