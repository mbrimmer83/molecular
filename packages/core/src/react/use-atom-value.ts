import { useSyncExternalStore } from 'react'
import { useStore } from './use-store'

// Types
import type { Atom } from '../types'

export function useAtomValue<T>(atom: Atom<T>): T {
  const store = useStore()

  const subscribe = (onStoreChange: () => void): (() => void) => {
    return store.subscribe(atom, onStoreChange)
  }

  const getSnapshot = () => store.get(atom)

  return useSyncExternalStore(subscribe, getSnapshot)
}
