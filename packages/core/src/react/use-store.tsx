import { useContext } from 'react';
import { StoreContext } from './provider';
import type { Store } from '../lib/store';

export const useStore = (): Store => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
