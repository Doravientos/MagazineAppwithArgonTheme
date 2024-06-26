import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import axiosInstance from "../../config/axiosInstance";


export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axiosInstance.post("/signin", data);
    await AsyncStorage.setItem("token", response.token);
    return response.data;
  } catch (error) {}
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    
    const response = await axios.post("/signup", data);
    return response.data;
  } catch (error) {}
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
