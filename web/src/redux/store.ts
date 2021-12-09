import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";

import { actionLog } from "./middlewares/actionLog";
import { language } from "./middlewares/language";
import { productDetailSlice } from "./productDetail/slice";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, actionLog, language)
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
