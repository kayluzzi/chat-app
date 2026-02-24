import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import taskReducer from "./tasks/taskSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    },
})