export const CHANGE_LANGAGE = "CHANGE_LANGAGE";
export const ADD_LANGUAGE = "ADD_LANGUAGE";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGAGE;
  payload: "zh" | "en";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string; code: string };
}

export type LanguageActionType = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "zh" | "en"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGAGE,
    payload: languageCode,
  };
};

interface addLanguage {
  name: string;
  code: string;
}

export const addLanguageActionCreator = (
  language: addLanguage
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: { ...language },
  };
};
