import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  loading: false,
  task: {
    taskId: 0,
    taskTemplateId: 0,
    userId: 0,
    status: "",
    taskName: "",
    taskType: "",
  },
  tasks: [
    {
      taskId: 0,
      taskTemplateId: 0,
      userId: 0,
      status: "",
      taskName: "",
      taskType: "",
    },
  ],
};

export const getTasksByUser = createAsyncThunk(
  "task/getByUser",
  async ({ email, token }) => {
    console.log(email, token)
    const response = await taskService.getTasksByUser(email, token);
    console.log(response.data);
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, task, token }) => {
    console.log(taskId, task, token)
    const response = await taskService.updateTask(taskId, task, token);
    console.log(response.data);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByUser.pending, (state, action) => {
        console.log("getTasksByUser.pending");
        state.loading = true;
      })
      .addCase(getTasksByUser.fulfilled, (state, action) => {
        console.log("getTasksByUser.fulfilled");
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasksByUser.rejected, (state, action) => {
        console.log("getTasksByUser.rejected");
        state.loading = false;
        console.log(action.error)
      })

      .addCase(updateTask.pending, (state, action) => {
        console.log("updateTask.pending");
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log("updateTask.fulfilled");
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.log("updateTask.rejected");
        state.loading = false;
        console.log(action.error)
      })
  },
});

export const { increment, decrement, incrementByAmount } = taskSlice.actions;
export default taskSlice.reducer;
