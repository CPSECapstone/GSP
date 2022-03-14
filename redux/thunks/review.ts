import { API, graphqlOperation } from "aws-amplify";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { listReviews } from "../../src/graphql/queries";
import { ListReviewsQuery } from "../../src/API";
import notEmpty from "./helper";
import { reviewsLoading, reviewsRecieved } from "../slices/review";

const fetchReviews =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(reviewsLoading());
    const res = (await API.graphql(graphqlOperation(listReviews))) as {
      data: ListReviewsQuery;
    };
    const reviews = res?.data?.listReviews?.items ?? [];
    const noNullReviews = reviews.filter(notEmpty);
    dispatch(reviewsRecieved(noNullReviews));
  };

export default fetchReviews;
