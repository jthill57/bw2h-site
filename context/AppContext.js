'use client';

import { createContext, useContext } from 'react';
import { appConfig } from '@/config';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children, apiKey }) {
  return (
    <AppContext.Provider value={{ ...appConfig, API_KEY: apiKey }}>
      {children}
    </AppContext.Provider>
  );
}
