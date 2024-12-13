import { useSyncExternalStore } from 'react'
import { useStore } from './use-store'
import type { Atom } from '../lib/atom'

export function useAtomValue<T>(atom: Atom<T>): T {
  const store = useStore()

  const subscribe = (onStoreChange: () => void): (() => void) => {
    return store.subscribe(atom, onStoreChange)
  }

  const getSnapshot = () => store.get(atom)

  return useSyncExternalStore(subscribe, getSnapshot)
}
