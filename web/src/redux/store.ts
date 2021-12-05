import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";

import { actionLog } from "./middlewares/actionLog";
import { language } from "./middlewares/language";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, actionLog, language)
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
