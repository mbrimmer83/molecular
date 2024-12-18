import type { Atom, AtomActions } from '../types'

export function createAtom<T>(
  key: string,
  initialState: T,
  actions?: AtomActions<T>,
  kind = 'standard'
): Atom<T> {
  return {
    key,
    initialState,
    actions: {
      ...(actions || {})
    },
    kind
  }
}
