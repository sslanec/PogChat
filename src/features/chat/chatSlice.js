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

import { createSlice, nanoid } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push({ ...action.payload, key: nanoid() });
    },
    clearMessages(state, action) {
      for (let i = 0; i < state.length; i + 1) {
        if (state[i]['channel'] === action.payload) {
          state.splice(i, 1);
        }
      }
    },
    deleteMessage(state, action) {
      let deleted = false;
      let i = state.length - 1;
      while (!deleted) {
        if (
          state[i]['id'] === action.payload &&
          state[i]['msgType'] === 'chat'
        ) {
          state[i]['msg'] = '< message deleted >';
          deleted = true;
        }
        i = i - 1;
      }
    },
    emptyChat(state) {
      state.splice(0, state.length);
    },
  },
});

export const { addMessage, clearMessages, deleteMessage, emptyChat } =
  chatSlice.actions;

export default chatSlice.reducer;
