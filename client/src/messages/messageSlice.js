import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
    loading: false,
    messages: []
}

export const getChannelMessages = createAsyncThunk("message/getChannelMessages", async ({channelName, token}) => {
    console.log("getChannelMessages", channelName, token)
    const response = await messageService.getChannelMessages(channelName, token)
    return response.data
})

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getChannelMessages.pending, (state, action) => {
            console.log("getChannelMessages.pending")
            state.loading = true
        })
        .addCase(getChannelMessages.fulfilled, (state, action) => {
            console.log("getChannelMessages.fulfilled")
            state.messages = action.payload.channel.messages
            state.loading = false
        })
        .addCase(getChannelMessages.rejected, (state, action) => {
            state.loading = false
            console.log(action.error)
        })
    },
})

export const { } = messageSlice.actions
export default messageSlice.reducer