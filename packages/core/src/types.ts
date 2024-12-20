export type Get<T> = (atom: Atom<T>) => T

export type Set<T> = (atom: Atom<T>, newState: T | ((prevState: T) => T)) => T

export type Dispatch<T> = (
  atom: Atom<T>,
  action: keyof AtomActions<T>,
  ...args: any[]
) => Promise<void>

export type Push<S, T> = (get: Get<S>, set: Set<T>) => void

export type Pusher<S, T> = (get: Get<S>, set: Set<T>) => void

export type AtomType = 'readonly' | 'writable'

export type Atom<T> = {
  key: string
  initialState: T
  kind: string
  actions: AtomActions<T>
}

export type AtomStoreContext<T> = {
  get: Get<T>
  set: Set<T>
  dispatch: Dispatch<T>
}

export type AtomAppContext = {
  [key: string]: unknown
}

export type AtomActions<T> = {
  [key: string]: (
    store: AtomStoreContext<T>,
    app: AtomAppContext,
    ...args: any[]
  ) => T | Promise<T | void> | void
}

export interface Bond<S, T> {
  source: Atom<S>
  target: Atom<T>
  push: (sourceState: S, targetState: T, dispatch: Dispatch<T>) => void
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
  subscribeBond: (bond: Bond<any, any>) => () => void
}

export type Subscriber<T> = (state: T) => void
