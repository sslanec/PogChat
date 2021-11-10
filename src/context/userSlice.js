// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userOptions: {
      badgeQuality: 3,
      emoteQuality: 3,
      usernameColors: true,
      chatTextSize: 'md',
      theme: 'dark',
      loadRecent: true,
      msgAmount: 30,
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
    clearBttvAndBadges(state) {
      state.bttvEmotes = null;
      state.channelBadges = null;
    },
  },
});

export const { updateUser, clearBttvAndBadges } = userSlice.actions;

export default userSlice.reducer;
