import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      message:
        "Hello! I'm here to assist you. Could you please provide some details about what print would you like to see in the T-Shirt?",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming"
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, sender } = action.payload;
      const direction = sender === 'user' ? 'outgoing' : 'incoming';
      state.messages.push({
        message: message,
        sentTime: new Date().toLocaleString(),
        sender: sender,
        direction: direction 
      });
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
