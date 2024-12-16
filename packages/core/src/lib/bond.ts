import type { Atom, Bond } from '../types'

export function createBond<S, T>(
  source: Atom<S>,
  target: Atom<T>,
  transform: (sourceState: S) => Partial<T>
): Bond<S, T> {
  return { source, target, transform }
}
