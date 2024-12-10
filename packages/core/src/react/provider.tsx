import React, { createContext, useRef } from 'react';
import { createStore, type Store } from '../lib/store';

export const StoreContext = createContext<ReturnType<
  typeof createStore
> | null>(null);

export const Provider: React.FC<{
  children: React.ReactNode;
  store?: Store;
}> = ({ children, store }) => {
  const storeRef = useRef<Store>();
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
