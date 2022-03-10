import { API, graphqlOperation } from "aws-amplify";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { listUsers } from "../../src/graphql/queries";
import { ListUsersQuery } from "../../src/API";
import { userLoading, userRecieved } from "../slices/user";

const fetchUser =
  (email: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(userLoading());
    const filter = { email: { eq: email } };
    const res = (await API.graphql(
      graphqlOperation(listUsers, { filter })
    )) as {
      data: ListUsersQuery;
    };
    console.log(res);
    const user = res?.data?.listUsers?.items[0] ?? undefined;
    dispatch(userRecieved(user));
  };

export default fetchUser;
