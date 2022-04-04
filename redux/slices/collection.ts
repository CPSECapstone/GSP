import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../../src/API";
import { CollectionQueryType, CollectionType } from "../../src/APITypes";

interface CollectionState {
  collections: CollectionType[];
  loading: "idle" | "pending";
}

const initialState: CollectionState = {
  collections: [],
  loading: "idle",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    collectionsLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    collectionsRecieved(state, action: PayloadAction<CollectionType[]>) {
      if (state.loading === "pending") {
        state.collections = action.payload;
        state.loading = "idle";
      }
    },
    collectionRemoval(state, action: PayloadAction<string>) {
      const newState = state.collections.filter(
        (c) => c?.id !== action.payload
      );
      state.collections = newState;
    },
    addCollection(state, action: PayloadAction<CollectionType>) {
      const newCollections = [...state.collections, action.payload];
      state.collections = newCollections;
    },
  },
});

export const {
  collectionsLoading,
  collectionsRecieved,
  collectionRemoval,
  addCollection,
} = collectionSlice.actions;

const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
