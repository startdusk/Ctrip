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
  return state;
};

export default languageReducer;
