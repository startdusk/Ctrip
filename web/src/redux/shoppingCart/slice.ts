import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export interface ShoppingState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingState = {
  loading: true,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:5000/api/shoppingCart`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return camelcaseKeys(data, { deep: true });
  }
);

export const addShoppingCart = createAsyncThunk(
  "shoppingCart/addShoppingCart",
  async (parameter: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://localhost:5000/api/shoppingCart/items`,
      {
        tourist_route_id: parameter.touristRouteId,
      },
      {
        headers: {
          Authorization: `Bearer ${parameter.jwt}`,
        },
      }
    );
    return camelcaseKeys(data.shoppingCartItems, { deep: true });
  }
);

export const clearShoppingCart = createAsyncThunk(
  "shoppingCart/clearShoppingCart",
  async (parameter: { jwt: string; itemIds: number[] }, thunkAPI) => {
    return await axios.delete(
      `http://localhost:5000/api/shoppingCart/items/(${parameter.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `Bearer ${parameter.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    [addShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    [addShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    [clearShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCart.fulfilled.type]: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
    },
    [clearShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
