import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const userCollections = createSlice({
  name: "collections",
  initialState: {
    userCollections: [
      {
        id: uuidv4(),
        collectionName: "",
        images: [
          {
            id: uuidv4(),
            src: "",
          },
        ],
      },
    ],
  },
  reducers: {
    addImageToCollection: (state, action) => {
        state.userCollections = [...state.userCollections, action.payload];
    },
    removeImageFromCollection: (state, action) => {
      const { collectionId, imageId } = action.payload;
      const collection = state.userCollections.find(
        (collection) => collection.id === collectionId
      );
      if (collection) {
        collection.images = collection.images.filter(
          (image) => image.id !== imageId
        );
      }
    },
  },
});


export const {addImageToCollection, removeImageFromCollection} = userCollections.actions
export default userCollections.reducer