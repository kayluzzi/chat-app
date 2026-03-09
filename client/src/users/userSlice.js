import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    loading: false,
    user: {
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        roles: []
    },
    users: [
        {
            userId: 0,
            firstName: "",
            lastName: "",
            email: "",
            roles: []
        }
    ]
}

export const getUsers = createAsyncThunk("user/getUsers", async ({ token }) => {
    console.log("userSlice getUsers", token)
    const response = await userService.getUsers(token)
    return response.data
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            console.log("getUsers.pending")
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            console.log("getUsers.fulfilled")
            state.users = action.payload.users
            state.loading = false
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            console.log(action.error)
        })
    },
})

export const { } = userSlice.actions
export default userSlice.reducer