import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../reducers/authReducer";
import alertReducer from '../reducers/alertReducer';
import friendsReducer from "../reducers/friendsReducer";
import chatReducer from "../reducers/chatReducer";
import roomReducer from "../reducers/roomReducer";
import streamReducer from '../reducers/streamReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomReducer,
    streams: streamReducer,
  },
});

export default store;