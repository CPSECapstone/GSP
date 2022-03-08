import { API, graphqlOperation } from "aws-amplify";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { businessLoading, businessReceived } from "../slices/business";
import { RootState } from "../store";
import { listBusinesses } from "../../src/graphql/queries";
import { ListBusinessesQuery } from "../../src/API";
import notEmpty from "./helper";

const fetchBusinesses =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(businessLoading());
    const res = (await API.graphql(graphqlOperation(listBusinesses))) as {
      data: ListBusinessesQuery;
    };
    const businesses = res?.data?.listBusinesses?.items ?? [];
    const noNullBusinesses = businesses.filter(notEmpty);
    dispatch(businessReceived(noNullBusinesses));
  };

export default fetchBusinesses;
