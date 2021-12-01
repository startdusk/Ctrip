import i18n from "i18next";

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

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "change_language":
      const language = action.payload;
      i18n.changeLanguage(language);
      return { ...state, language };
    case "add_language":
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
};

export default languageReducer;
