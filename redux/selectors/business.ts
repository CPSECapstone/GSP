import { RootState } from "../store";

const selectAllBusinesses = (state: RootState) => state.business.businesses;
const selectBusinessById = (id: string) => (state: RootState) =>
  state.business.businesses.find((business) => business?.id === id);

export { selectAllBusinesses, selectBusinessById };
