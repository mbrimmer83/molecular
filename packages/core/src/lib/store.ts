import type { Atom } from './atom'
import type { Bond } from './bond'

// Types
import type { AtomActions } from './atom'

export type Store = {
  get: <T>(atom: Atom<T>) => T
  set: <T>(atom: Atom<T>, newState: T | ((prevState: T) => T)) => T
  dispatch: <T>(atom: Atom<T>, action: string, ...args: any[]) => void
  subscribe: <T>(atom: Atom<T>, callback: () => void) => () => void
}

type Subscriber<T> = (state: T) => void

export const createStore = (): Store => {
  const state = new WeakMap<Atom<any>, any>()
  const subscribers = new Map<any, Set<Subscriber<any>>>()
  const bonds = new WeakMap<object, Bond<any, any>[]>()

  const get = <T>(atom: Atom<T>): T => {
    if (!state.has(atom)) {
      state.set(atom, atom.initialState)
    }
    return state.get(atom)
  }

  const set = <T>(atom: Atom<T>, newState: T | ((prevState: T) => T)): T => {
    const currentState = get(atom)

    const updatedState =
      typeof newState === 'function' ? (newState as (prevState: T) => T)(currentState) : newState

    state.set(atom, updatedState)

    if (subscribers.has(atom)) {
      subscribers.get(atom)?.forEach((callback) => callback(updatedState))
    }

    return updatedState
  }

  const dispatch = async <T>(
    atom: Atom<T>,
    action: keyof AtomActions<T>,
    ...args: any[]
  ): Promise<void> => {
    const actionFn = atom.actions[action]
    if (!actionFn) {
      throw new Error(`Action "${action}" not found on atom.`)
    }

    const result = actionFn(get, set, ...args)

    if (result instanceof Promise) {
      await result
    }
  }

  const subscribe = <T>(atom: Atom<T>, callback: () => void): (() => void) => {
    if (!subscribers.has(atom)) {
      subscribers.set(atom, new Set())
    }
    subscribers.get(atom)?.add(callback)

    return () => {
      subscribers.get(atom)?.delete(callback)
      if (subscribers.get(atom)?.size === 0) {
        subscribers.delete(atom)
      }
    }
  }

  const addBond = (molecule: object, bond: Bond<any, any>) => {
    if (!bonds.has(molecule)) {
      bonds.set(molecule, [])
    }
    bonds.get(molecule)?.push(bond)

    // Subscribe to the source atom
    const { source, target, transform } = bond
    subscribe(source, () => {
      const transformedState = transform(get(source))
      set(target, transformedState)
    })
  }

  return { get, set, dispatch, subscribe }
}
