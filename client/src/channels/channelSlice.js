import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import channelService from "./channelService";

const initialState = {
    loading: false,
    channels: [
        {
            name: "",
            icon: { type: "", name: "", svg: "" },
            description: ""
        }
    ]
}

export const getAllChannels = createAsyncThunk("channel/getAllChannels", async (token) => {
    console.log("channelSlice getAllChannels", token)
    const response = await channelService.getAllChannels(token)
    return response.data
})

const channelSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllChannels.pending, (state, action) => {
            console.log("getAllChannels.pending")
            state.loading = true
        })
        .addCase(getAllChannels.fulfilled, (state, action) => {
            console.log("getAllChannels.fulfilled")
            state.channels = action.payload.channels
            state.loading = false
        })
        .addCase(getAllChannels.rejected, (state, action) => {
            console.log("getAllChannels.rejected")
            state.loading = false
            console.log(action.error)
        })
    },
})

export const { } = channelSlice.actions
export default channelSlice.reducer