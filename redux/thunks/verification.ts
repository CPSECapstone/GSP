import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { ListVerificationRequestsQuery } from "../../src/API";
import { listVerificationRequests } from "../../src/graphql/queries";
import { requestsLoading, requestsRecieved } from "../slices/verification";
import { RootState } from "../store";
import notEmpty from "./helper";

const fetchRequests =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(requestsLoading());

    const res = (await API.graphql(
      graphqlOperation(listVerificationRequests)
    )) as {
      data: ListVerificationRequestsQuery;
    };
    const requests = res?.data?.listVerificationRequests?.items ?? [];
    const noNullRequests = requests.filter(notEmpty);

    dispatch(requestsRecieved(noNullRequests));
  };

export default { fetchRequests };
