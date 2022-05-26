// @ts-nocheck
import { test, expect, describe } from "@jest/globals";
import {
  selectAllBusinesses,
  selectBusinessById,
} from "../redux/selectors/business";
import businessReducer, {
  updateBusiness,
  businessLoading,
  businessReceived,
  BusinessState,
} from "../redux/slices/business";

const business1 = {
  id: "1111",
  name: "Test1",
};
const business2 = {
  id: "2222",
  name: "Test2",
};
const business3 = {
  id: "3333",
  name: "Test3",
};

const initialState: BusinessState = {
  businesses: [],
  loading: "idle",
};

const fullState: BusinessState = {
  businesses: [business1, business2],
  loading: "idle",
};

const reduxFullState = {
  business: fullState,
};

// selector tests
describe("selectBusinessByID", () => {
  test("BusinessID is valid", () => {
    const business = selectBusinessById("1111")(reduxFullState);
    expect(business).toEqual(business1);
  });
  test("BusinessID is not valid", () => {
    const business = selectBusinessById("4444")(reduxFullState);
    expect(business).toBeUndefined();
  });
});

describe("selectAllBusinesses when", () => {
  test("businesses are populated", () => {
    const businesses = selectAllBusinesses(reduxFullState);
    expect(businesses).toEqual([business1, business2]);
  });
  test("businesses is empty", () => {
    const modifiedState = { business: initialState };
    const businesses = selectAllBusinesses(modifiedState);
    expect(businesses).toEqual([]);
  });
});

// reducer tests
test("businessLoading", () => {
  const business = businessReducer(initialState, businessLoading());
  expect(business).toEqual({
    ...initialState,
    loading: "pending",
  });
});

describe("businessesRecieved when", () => {
  test("business array is empty", () => {
    const modifiedState = { ...initialState, loading: "pending" };
    const curState = businessReducer(
      modifiedState,
      businessReceived([business1, business2])
    );
    expect(curState.businesses).toEqual([business1, business2]);
    expect(curState.loading).toEqual("idle");
  });
  test("business array is full", () => {
    const modifiedState = { ...fullState, loading: "pending" };
    const curState = businessReducer(
      modifiedState,
      businessReceived([business3])
    );
    expect(curState.businesses).toEqual([business3]);
    expect(curState.loading).toEqual("idle");
  });
  test("not pending", () => {
    expect(() =>
      businessReducer(fullState)(businessReceived([business3]))
    ).toThrowError();
  });
});

describe("updateBusiness when", () => {
  test("setting to an existing id", () => {
    const modifiedBusiness = {
      id: "1111",
      name: "Updated Business",
    };
    const curState = businessReducer(
      fullState,
      updateBusiness(modifiedBusiness)
    );
    expect(curState.businesses).toEqual([modifiedBusiness, business2]);
  });
  test("setting to undefined", () => {
    const modifiedBusiness = {
      id: undefined,
      name: undefined,
    };
    const curState = businessReducer(
      fullState,
      updateBusiness(modifiedBusiness)
    );
    expect(curState.undefined).toEqual(undefined);
  });
});
