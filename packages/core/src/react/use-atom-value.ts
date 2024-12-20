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

  // Provide the same snapshot for server rendering
  const getServerSnapshot = getSnapshot

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
