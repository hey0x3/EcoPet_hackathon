import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from './strings';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('app.lang');
      if (savedLang && ['en', 'tr', 'bs'].includes(savedLang)) {
        setLangState(savedLang);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLang = async (newLang) => {
    try {
      if (['en', 'tr', 'bs'].includes(newLang)) {
        setLangState(newLang);
        await AsyncStorage.setItem('app.lang', newLang);
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Translation function with variable replacement
  const t = (key, vars = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    
    // Replace variables like {{name}}, {{city}}, etc.
    Object.keys(vars).forEach(varKey => {
      const placeholder = `{{${varKey}}}`;
      text = text.replace(placeholder, vars[varKey]);
    });
    
    return text;
  };

  const value = {
    lang,
    setLang,
    t,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
