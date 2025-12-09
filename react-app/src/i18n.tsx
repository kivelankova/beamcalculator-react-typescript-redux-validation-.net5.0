import i18n, { InitOptions } from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const options: InitOptions = {
  backend: {
    // translation file path
    loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
  },
  fallbackLng: "en",
  lng: "en", // default language
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  // react: {
  //   wait: true,
  // },
  detection: {
    order: ["localStorage", "navigator"],
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
