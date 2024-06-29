import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../constants/config";

export const signin = createAsyncThunk("auth/signin", async (data) => {
  try {
    const response = await axiosInstance({
      url: "/signin",
      method: "POST",
      data,
    });
    await AsyncStorage.setItem("username", response.data.user.name);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await axiosInstance({
      url: "/signup",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {}
});

export const signout = createAsyncThunk("auth/signout", async (data) => {
  try {
    const response = await axiosInstance({
      url: "/signout",
      method: "POST",
    });
    return response.data;
  } catch (error) {}
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    token: null,
    isLogged: false
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.isLogged = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLogged = false;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
