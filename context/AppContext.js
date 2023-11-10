'use client';

import { createContext, useContext } from 'react';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children, config, apiKey }) {
  return (
    <AppContext.Provider value={{ ...config, API_KEY: apiKey }}>
      {children}
    </AppContext.Provider>
  );
}
