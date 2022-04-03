import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { ListCollectionsQuery } from "../../src/API";
import { listCollections } from "../../src/graphql/queries";
import { collectionsRecieved } from "../slices/collection";
import { notificationsLoading } from "../slices/notifications";
import { AppDispatch, RootState } from "../store";
import notEmpty from "./helper";

const fetchCollections =
  (currentUserID: string): ThunkAction<void, RootState, undefined, AnyAction> =>
  async (dispatch: AppDispatch) => {
    dispatch(notificationsLoading());

    const res = (await API.graphql({
      query: listCollections,
      variables: { filter: { userID: { eq: currentUserID } } },
    })) as {
      data: ListCollectionsQuery;
    };

    const collections = res?.data?.listCollections?.items ?? [];
    const noNullCollections = collections.filter(notEmpty);
    dispatch(collectionsRecieved(noNullCollections));
  };

export default { fetchCollections };
