import { useMemo } from 'react'
import { useStore } from './use-store'

// Types
import type { Atom } from '../lib/atom'

export const useAtomActions = <T, A extends Record<string, (...args: any[]) => any>>(
  atom: Atom<T> & { actions?: A }
): Record<keyof A, (...args: any[]) => any> => {
  const store = useStore()

  const actions = useMemo(() => {
    if (!atom.actions) {
      return {} as Record<keyof A, (...args: any[]) => any>
    }

    return Object.keys(atom.actions).reduce((acc, actionKey) => {
      ;(acc as Record<keyof A, (...args: any[]) => any>)[actionKey as keyof A] = (
        ...args: any[]
      ) => {
        store.dispatch(atom, actionKey, ...args)
      }
      return acc
    }, {} as Partial<Record<keyof A, (...args: any[]) => any>>) as Record<
      keyof A,
      (...args: any[]) => any
    >
  }, [store, atom])

  return actions
}
