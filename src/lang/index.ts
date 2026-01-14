import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import { langEn } from './en';
import { langVi } from './vi';
import { LOCAL_STORAGE_KEY, localStorageService } from '~/tools/storages';

let lang = 'en';
const browserLanguage = navigator.language;
const lsLang = localStorageService.get(LOCAL_STORAGE_KEY.LANG);
if (lsLang) {
  lang = lsLang;
} else if (['en-US', 'en']?.includes(browserLanguage)) {
  lang = 'en';
} else if (['vi-VN', 'vi']?.includes(browserLanguage)) {
  lang = 'vi';
}

if (!lsLang) {
  localStorageService.set(LOCAL_STORAGE_KEY.LANG, lang);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: langEn,
      },
      vi: {
        translation: langVi,
      },
    },
    lng: lang, // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
