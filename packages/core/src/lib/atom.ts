import type { Atom, AtomActions, AtomType } from '../types'

export function createAtom<T>(
  key: string,
  initialState: T,
  actions?: AtomActions<T>,
  type: AtomType = 'writable'
): Atom<T> {
  return {
    key,
    initialState,
    actions: {
      ...(actions || {})
    },
    type
  }
}
