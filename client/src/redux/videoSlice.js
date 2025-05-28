import { createSlice } from "@reduxjs/toolkit";

// initial state for video slice
const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

// Creating the slice
export const videoSlice = createSlice({
  name: "video",       // name of the slice
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },

    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    like: (state, action) => {
      const userId = action.payload;

      if (!state.currentVideo.likes.includes(userId)) {
        state.currentVideo.likes.push(userId); // Add like

        const dislikeIndex = state.currentVideo.dislikes.findIndex(
          (id) => id === userId
        );
        if (dislikeIndex !== -1) {
          state.currentVideo.dislikes.splice(dislikeIndex, 1);
        }
      }
    },

    dislike: (state, action) => {
      const userId = action.payload;

      if (!state.currentVideo.dislikes.includes(userId)) {
        state.currentVideo.dislikes.push(userId); // Add dislike

        const likeIndex = state.currentVideo.likes.findIndex(
          (id) => id === userId
        );
        if (likeIndex !== -1) {
          state.currentVideo.likes.splice(likeIndex, 1);
        }
      }
    },
  },
});

// Exporting all the actions so we can use them in our components
export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  dislike,
} = videoSlice.actions;

// Exporting the reducer so we can add it to Redux store
export default videoSlice.reducer;