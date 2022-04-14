import { RootState } from "../store";

const selectAllUserCollections = (state: RootState) =>
  state.collection.collections;

export default selectAllUserCollections;
