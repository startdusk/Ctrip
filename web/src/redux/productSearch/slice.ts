import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const getProductSearch = createAsyncThunk(
  "productSearch/getProductSearch",
  async (
    paramters: {
      keywords: string | undefined;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://localhost:5000/api/TouristRoutes?&pageNumber=${paramters.nextPage}&pageSize=${paramters.pageSize}`;
    if (paramters.keywords) {
      url += `&keywords=${paramters.keywords}`;
    }
    const response = await axios.get(url);
    return {
      data: camelcaseKeys(response.data, { deep: true }),
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
  }
);

export const productSearchSlice = createSlice({
  name: "productSearchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductSearch.pending.type]: (state) => {
      state.loading = true;
    },
    [getProductSearch.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    [getProductSearch.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
