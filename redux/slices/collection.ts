import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../../src/models";

interface CollectionState {
  collections: Collection[];
}

const initialState: CollectionState = {
  collections: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
  },
});

export const { setCollections } = collectionSlice.actions;

const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
