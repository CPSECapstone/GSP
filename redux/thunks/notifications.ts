import {
  notificationsLoading,
  notificationsRecieved,
} from "../slices/notifications";
import { AppDispatch, RootState } from "../store";
import { API, Auth } from "aws-amplify";
import { listNotifications } from "../../src/graphql/queries";
import { ListNotificationsQuery } from "../../src/API";
import notEmpty from "./helper";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";

const fetchNotifications =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(notificationsLoading());

    const user = await Auth.currentAuthenticatedUser();
    const res = (await API.graphql({
      query: listNotifications,
      variables: { userID: user?.id },
    })) as {
      data: ListNotificationsQuery;
    };

    const notifs = res?.data?.listNotifications?.items ?? [];
    const noNullNotifs = notifs.filter(notEmpty);

    console.log(noNullNotifs);
    dispatch(notificationsRecieved(noNullNotifs));
  };

export default fetchNotifications;
