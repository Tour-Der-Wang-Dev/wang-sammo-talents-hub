import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

type Language = 'th' | 'en';

const translations = { en, th };

// Helper to navigate nested JSON
const getNestedTranslation = (obj: any, key: string): string | undefined => {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');

  const t = useCallback((key: string): string => {
    const translation = getNestedTranslation(translations[language], key);
    return translation || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};