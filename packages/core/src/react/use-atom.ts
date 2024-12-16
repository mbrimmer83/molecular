import { useEffect } from 'react'
import { useAtomValue } from './use-atom-value'
import { useAtomActions } from './use-atom-actions'

// Types
import type { Atom } from '../types'

export const useAtom = <T, A extends Record<string, (...args: any[]) => any>>(
  atom: Atom<T> & { actions?: A }
): [T, Record<keyof A, (...args: any[]) => any>] => {
  const value = useAtomValue(atom)
  const actions = useAtomActions(atom)

  useEffect(() => {
    const init = async () => {
      if (actions.init) {
        await actions.init()
      }
    }
    init()
  }, [])

  return [value, actions]
}
