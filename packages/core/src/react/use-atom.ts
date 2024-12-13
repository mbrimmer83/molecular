import { useAtomValue } from './use-atom-value'
import { useAtomActions } from './use-atom-actions'

// Types
import type { Atom } from '../lib/atom'

export const useAtom = <T, A extends Record<string, (...args: any[]) => any>>(
  atom: Atom<T> & { actions?: A }
): [T, Record<keyof A, (...args: any[]) => any>] => {
  const value = useAtomValue(atom)
  const actions = useAtomActions(atom)

  return [value, actions]
}
