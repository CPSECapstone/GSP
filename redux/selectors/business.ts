import { RootState } from "../store";

const selectAllBusinesses = (state: RootState) => state.business.businesses;
const selectBusinessById = (id: string) => (state: RootState) =>
  state.business.businesses.find((business) => business?.id === id);
const selectBusinessesByUser = (userID: string) => (state: RootState) =>
  state.business.businesses.filter((business) => business?.userID === userID);

export { selectAllBusinesses, selectBusinessById, selectBusinessesByUser };
