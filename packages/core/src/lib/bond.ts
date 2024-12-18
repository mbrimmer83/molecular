import type { Atom, Bond } from '../types'

export function createBond<S, T>(
  source: Atom<S>,
  target: Atom<T>,
  push: (sourceState: S) => Partial<T>
): Bond<S, T> {
  return { source, target, push }
}
