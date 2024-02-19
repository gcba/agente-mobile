import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import es from "./es.json";

const i18n = new I18n();

i18n.translations = {
  en: en,
  es: es,
};

i18n.locale = Localization.locale.slice(0, 2);

i18n.enableFallback = true;

export default i18n;
