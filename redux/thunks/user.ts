import { API, graphqlOperation } from "aws-amplify";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { listUsers } from "../../src/graphql/queries";
import { ListUsersQuery } from "../../src/API";
import { userLoading, userRecieved } from "../slices/user";
import notEmpty from "./helper";

const fetchUsers =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(userLoading());
    const res = (await API.graphql(graphqlOperation(listUsers))) as {
      data: ListUsersQuery;
    };
    const users = res?.data?.listUsers?.items ?? [];
    const noNullUsers = users.filter(notEmpty);

    dispatch(userRecieved(noNullUsers));
  };

export default fetchUsers;
