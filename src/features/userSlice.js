import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userOptions: {
      badgeQuality: 3,
      emoteQuality: 3,
      usernameColors: true,
      chatTextSize: 'md',
    },
    connected: false,
    chatChannel: null,
    roomstate: null,
    userAccInfo: {
      displayName: 'Login',
      profilePictureUrl: '',
    },
    bttvEmotes: null,
    emoteSets: null,
    userEmotes: null,
    channelBadges: null,
    globalBadges: null,
    loggedIn: false,
    loginLoading: false,
    userFollows: null,
    followRefresh: null,
  },
  reducers: {
    updateUser(state, action) {
      for (var i in action.payload) {
        state[i] = action.payload[i];
      }
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
