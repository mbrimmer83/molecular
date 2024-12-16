import { useContext } from 'react'
import { StoreContext } from './provider'

// Types
import type { Store } from '../types'

export const useStore = (): Store => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
