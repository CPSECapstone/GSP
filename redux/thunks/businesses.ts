import { API, graphqlOperation } from "aws-amplify";
import { businessLoading, businessReceived } from "../slices/business";
import { AppDispatch } from "../store";
import { listBusinesses } from "../../src/graphql/queries";
import { ListBusinessesQuery } from "../../src/API";
import notEmpty from "./helper";

const fetchBusinesses = async (dispatch: AppDispatch) => {
  dispatch(businessLoading());
  const res = (await API.graphql(graphqlOperation(listBusinesses))) as {
    data: ListBusinessesQuery;
  };
  const businesses = res?.data?.listBusinesses?.items ?? [];
  const noNullBusinesses = businesses.filter(notEmpty);
  console.log(res);
  dispatch(businessReceived(noNullBusinesses));
};

export default fetchBusinesses;
