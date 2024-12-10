import type { Atom, Get, Set } from './atom';

export type Pusher<S, T> = (get: Get<S>, set: Set<T>) => void;

export type Bond = <S, T>(
  source: Atom<S>,
  target: Atom<T>,
  transform: (sourceState: S) => Partial<T>
) => void;

export function createBond<S, T>(
  source: Atom<S>,
  target: Atom<T>,
  transform: (sourceState: S) => Partial<T>
) {
  return (registerPush: ((get: Get<S>, set: Set<T>) => Pusher<S, T>) => void) => {
    return registerPush((get: Get<S>, set: Set<T>) => {
      set(transform(get()))
    })
  }
}
