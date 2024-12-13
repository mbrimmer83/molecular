import type { Atom, Get, Set } from './atom'

export type Pusher<S, T> = (get: Get<S>, set: Set<T>) => void

export interface Bond<S, T> {
  source: Atom<S>
  target: Atom<T>
  transform: (sourceState: S) => Partial<T>
}

export function createBond<S, T>(
  source: Atom<S>,
  target: Atom<T>,
  transform: (sourceState: S) => Partial<T>
): Bond<S, T> {
  return { source, target, transform }
}
