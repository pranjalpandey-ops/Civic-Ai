import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, dictionary } from './translations';

export { SUPPORTED_LANGUAGES, dictionary };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('civic_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('civic_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  const t = (key) => {
    if (!key) return '';
    return dictionary[lang]?.[key] || dictionary.en?.[key] || key;
  };

  const changeLanguage = (newLang) => {
    if (dictionary[newLang]) {
      setLang(newLang);
    }
  };

  const toggleLanguage = () => {
    setLang(prev => {
      const idx = SUPPORTED_LANGUAGES.findIndex(l => l.code === prev);
      const nextIdx = (idx + 1) % SUPPORTED_LANGUAGES.length;
      return SUPPORTED_LANGUAGES[nextIdx].code;
    });
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang: changeLanguage,
      changeLanguage,
      toggleLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
      currentLanguage: SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0]
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
