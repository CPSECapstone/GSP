import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, Auth, DataStore } from "aws-amplify";
import { User } from "../../src/models";
import {
  notificationsLoading,
  notificationsRecieved,
} from "../slices/notifications";
import { AppDispatch } from "../store";
import * as queries from "../../src/graphql/queries";
import { ListNotificationsQuery, ListUsersQuery } from "../../src/API";

const fetchNotifications = async (dispatch: AppDispatch) => {
  dispatch(notificationsLoading());

  // FETCH NOTIFICAITONS FROM CURRENT USER;
};
