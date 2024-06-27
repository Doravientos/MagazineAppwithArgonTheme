import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../constants/config";

export const getAllCategories = createAsyncThunk(
  "article/getAllCategories",
  async () => {
    try {
      const response = await axiosInstance({
        url: "/user/categories",
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {
    status: "idle",
    error: null,
    categories: [],
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetError } = articleSlice.actions;

export default articleSlice.reducer;
