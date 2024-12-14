export type Get<T> = (atom: Atom<T>) => T

export type Set<T> = (atom: Atom<T>, newState: T | ((prevState: T) => T)) => T

export type Push<S, T> = (get: Get<S>, set: Set<T>) => void

export type AtomType = 'readonly' | 'writable'

export type Atom<T> = {
  initialState: T
  type: AtomType
  actions: AtomActions<T>
}

export type AtomActions<T> = {
  [key: string]: (get: Get<T>, set: Set<T>, ...args: any) => T | Promise<T | void> | void
}
export function atom<T>(
  initialState: T,
  actions?: AtomActions<T>,
  type: AtomType = 'writable'
): Atom<T> {
  return {
    initialState,
    actions: {
      ...(actions || {})
    },
    type
  }
}
