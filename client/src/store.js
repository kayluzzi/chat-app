import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import channelReducer from "./channels/channelSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        channels: channelReducer
    },
})