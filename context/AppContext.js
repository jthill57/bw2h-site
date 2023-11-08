'use client';

import { createContext, useContext } from 'react';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children, appConfig }) {
  return (
    <AppContext.Provider value={appConfig}>
      {children}
    </AppContext.Provider>
  );
}
