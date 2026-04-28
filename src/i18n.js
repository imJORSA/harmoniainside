import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import et from './locales/et.json'
import it from './locales/it.json'
import ja from './locales/ja.json'

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { en, et, it, ja },
      fallbackLng: 'en',
      detection: {
        order: ['sessionStorage', 'navigator'],
        caches: ['sessionStorage'],
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
      },
      interpolation: { escapeValue: false },
    })
}

export default i18n
