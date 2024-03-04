import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Image {
  id: string;
  src: string;
}

interface Collection {
  collectionId: string;
  collectionName: string;
  images: Image[];
}

interface UserCollectionsState {
  userCollections: Collection[];
}
const initialState: UserCollectionsState = {
  userCollections: [],
};

const userCollections = createSlice({
  name: "collections",
  initialState,
  reducers: {
    createCollection: (state, action) => {
      const { collectionId, collectionName } = action.payload;
      const existingCollectionIndex = state.userCollections.findIndex(
        (col) => col.collectionId === collectionId
      );
      if (existingCollectionIndex === -1) {
        state.userCollections.push({
          collectionId,
          collectionName,
          images: [],
        });
      } else {
        state.userCollections[existingCollectionIndex].collectionName =
          collectionName;
      }
    },
    addImageToCollection: (
      state,
      action: PayloadAction<{ collectionId: string; image: Image }>
    ) => {
      const { collectionId, image } = action.payload;
      const collection = state.userCollections.find(
        (col) => col.collectionId === collectionId
      );
      if (collection) {
        collection.images.push(image);
      }
    },
  },
});

export const { addImageToCollection, createCollection } = userCollections.actions;
export default userCollections.reducer;
