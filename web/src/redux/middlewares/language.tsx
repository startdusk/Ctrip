import { CHANGE_LANGAGE } from "../language/languageActions";

import i18n from "i18next";

export const language = (store) => (next) => (action) => {
  next(action);
  if (action.type === CHANGE_LANGAGE) {
    const language = action.payload;
    i18n.changeLanguage(language);
  }
};
