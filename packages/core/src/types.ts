export type Get<T> = (atom: Atom<T>) => T

export type Set<T> = (atom: Atom<T>, newState: T | ((prevState: T) => T)) => T

export type Push<S, T> = (get: Get<S>, set: Set<T>) => void

export type Pusher<S, T> = (get: Get<S>, set: Set<T>) => void

export type AtomType = 'readonly' | 'writable'

export type Atom<T> = {
  key: string
  initialState: T
  type: AtomType
  actions: AtomActions<T>
}

export type AtomActions<T> = {
  [key: string]: (get: Get<T>, set: Set<T>, ...args: any) => T | Promise<T | void> | void
}

export interface Bond<S, T> {
  source: Atom<S>
  target: Atom<T>
  transform: (sourceState: S) => Partial<T>
}

export type Molecule = {
  atoms: Atom<unknown>[]
  bonds?: Bond<unknown, unknown>[]
}

export type Store = {
  get: <T>(atom: Atom<T>) => T
  set: <T>(atom: Atom<T>, newState: T | ((prevState: T) => T)) => T
  dispatch: <T>(atom: Atom<T>, action: string, ...args: any[]) => void
  subscribe: <T>(atom: Atom<T>, callback: () => void) => () => void
}

export type Subscriber<T> = (state: T) => void
