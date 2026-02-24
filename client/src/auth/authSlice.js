import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    roles: [],
    tokens: [],
  },
};

export const login = createAsyncThunk("auth/login", async (loginForm) => {
  const response = await authService.login(loginForm);
  console.log(response.data);
  return response.data;
});

export const me = createAsyncThunk("auth/me", async (token) => {
  const response = await authService.me(token);
  console.log(response.data);
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async (token) => {
  const response = await authService.logout(token);
  console.log(response.data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log("login.pending");
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login.fulfilled");
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login.rejected");
        state.loading = false;
        // handle error state
      })

      .addCase(me.pending, (state, action) => {
        console.log("me.pending");
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        console.log("me.fulfilled");
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(me.rejected, (state, action) => {
        console.log("me.rejected");
        state.loading = false;
        // handle error state
      })

      .addCase(logout.pending, (state, action) => {
        console.log("logout.pending");
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log("logout.fulfilled");
        state.loading = false;
        state.isLoggedIn = false;
        state.user = {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          roles: [],
          tokens: [],
        }
        localStorage.removeItem("token")
      })
      .addCase(logout.rejected, (state, action) => {
        console.log("logout.rejected");
        state.loading = false;
        // handle error state
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;
export default authSlice.reducer;
