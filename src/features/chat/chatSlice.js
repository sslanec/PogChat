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
  },
});

export const { addMessage, clearMessages, deleteMessage } = chatSlice.actions;

export default chatSlice.reducer;
