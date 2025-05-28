import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

// Creating the slice
export const userSlice = createSlice({
  name: "user", // name of the slice
  initialState,
  reducers: {
    // reducer runs when login starts 
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // When the user logs out
    logout: (state) => {
      state.currentUser = null; // Remove user data
      state.loading = false;
      state.error = false;
    },

    subscription: (state, action) => {
      const channelId = action.payload; // Channel ID to sub/unsub

      if (state.currentUser.subscribedUsers.includes(channelId)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex((id) => id === channelId),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(channelId);
      }
    },
  },
});

// Exporting the actions to use them in components
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
} = userSlice.actions;

// Exporting the reducer to add it to the Redux store
export default userSlice.reducer;