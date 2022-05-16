//@ts-nocheck

import { test, expect, describe } from "@jest/globals";
import { useAppSelector } from "../redux/hooks";
import {
  selectAllReviews,
  selectReviewsByUser,
  selectReviewsByBusiness,
  selectReviewById,
} from "../redux/selectors/review";

import reviewReducer, {
  addReview,
  editReview,
  deleteReviewRedux,
  ReviewState,
  reviewsLoading,
  reviewsRecieved,
} from "../redux/slices/review";

// testing data

const initialState: ReviewState = {
  reviews: [],
  loading: "idle",
};

const review1 = {
  id: "R1",
  review: 1.0,
  comments: "Test Review 1 Comment",
};

const review2 = {
  id: "R2",
  review: 3.0,
  comments: "Test Review 2 Comment",
};

const review3 = {
  id: "R3",
  review: 5.0,
  comments: "Test Review 3 Comment",
};

const fullState: ReviewState = {
  reviews: [review1, review2, review3],
  loading: "idle",
};

const reduxFullState = {
  review: fullState,
};

// selector tests
describe("select all reviews", () => {
  test("select single review", () => {
    const curReview = selectReviewById("R1")(reduxFullState);
    expect(curReview).toEqual(review1);
  });

  test("ID is undefined", () => {
    const modifiedState = { review: { ...fullState, id: undefined } };
    const curReview = selectReviewById("")(modifiedState);
    expect(curReview).toBeUndefined();
  });

  test("reviewIDs are defined", () => {
    const curReview = selectAllReviews(reduxFullState);
    expect(curReview).toEqual([review1, review2, review3]);
  });

  test("reviews are empty", () => {
    const modifiedState = { review: initialState };
    const curReviews = selectAllReviews(modifiedState);
    expect(curReviews).toEqual([]);
  });
});

// reducer tests

test("reviewsLoading", () => {
  const curState = reviewReducer(initialState, reviewsLoading());
  expect(curState).toEqual({
    ...initialState,
    loading: "pending",
  });
});

describe("reviewReceived when", () => {
  test("reviews array is empty", () => {
    const modifiedState = { ...initialState, loading: "pending" };
    const curState = reviewReducer(
      modifiedState,
      reviewsRecieved([review1, review2])
    );
    expect(curState.reviews).toEqual([review1, review2]);
    expect(curState.loading).toEqual("idle");
  });

  test("reviews array is full", () => {
    const modifiedState = { ...fullState, loading: "pending" };
    const curState = reviewReducer(modifiedState, reviewsRecieved([review3]));
    expect(curState.reviews).toEqual([review3]);
    expect(curState.loading).toEqual("idle");
  });

  test("not pending", () => {
    expect(() =>
      userReducer(fullState, reviewsRecieved([review3]))
    ).toThrowError();
  });
});
