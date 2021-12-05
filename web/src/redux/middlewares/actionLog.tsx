import { CHANGE_LANGAGE } from "../language/languageActions";

import i18n from "i18next";

export const actionLog = (store) => (next) => (action) => {
  console.log("state 当前", store.getState());
  console.log("fire action ", action);
  next(action);
  if (action.type === CHANGE_LANGAGE) {
    const language = action.payload;
    i18n.changeLanguage(language);
  }
  console.log("state 更新", store.getState());
};
