import { RootState } from "../store";

const selectAllBusinesses = (state: RootState) => state.business.businesses;

export default selectAllBusinesses;
