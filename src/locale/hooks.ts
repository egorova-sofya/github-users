import React, { useEffect } from 'react';
import { Locale } from './types';
import { applyLocale, getSavedLocale } from './utils';

export const useLocale = (): {
  locale: Locale;
  setLocale: React.Dispatch<Locale>;
} => {
  const [locale, setLocale] = React.useState(getSavedLocale());

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return { locale, setLocale };
};
