import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    clearImage: (state) => {
      state.image = null;
    },
  },
});

export const { setImage, clearImage } = imageSlice.actions;
export default imageSlice.reducer;
