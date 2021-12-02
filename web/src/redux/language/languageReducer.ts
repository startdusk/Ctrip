import i18n from "i18next";

import {
  CHANGE_LANGAGE,
  ADD_LANGUAGE,
  LanguageActionType,
} from "./languageActions";

interface LanguageState {
  language: "zh" | "en";
  languageList: {
    name: string;
    code: string;
  }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },

    { name: "English", code: "en" },
  ],
};

const languageReducer = (state = defaultState, action: LanguageActionType) => {
  switch (action.type) {
    case CHANGE_LANGAGE:
      const language = action.payload;
      i18n.changeLanguage(language); // 这样处理是不标准的，有副作用
      return { ...state, language };
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};

export default languageReducer;
