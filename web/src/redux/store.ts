import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";

import { actionLog } from './middlewares/actionLog';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;
