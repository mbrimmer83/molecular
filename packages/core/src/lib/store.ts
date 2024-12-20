// Types
import type { AtomActions, Atom, Bond, Store, Subscriber } from '../types'

export const createStore = (): Store => {
  const state = new WeakMap<Atom<any>, any>()
  const subscribers = new Map<any, Set<Subscriber<any>>>()
  const bondSubscribers = new Set<Bond<any, any>>()

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

    const result = actionFn({ get, set, dispatch }, {}, ...args)

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

  const subscribeBond = (bond: Bond<any, any>): (() => void) => {
    if (bondSubscribers.has(bond)) return () => null

    bondSubscribers.add(bond)

    const unsubscribe = subscribe(bond.source, () => {
      const sourceState = get(bond.source)
      const targetState = get(bond.target)
      // Call push function which will dispatch actions to set state
      bond.push(sourceState, targetState, dispatch)
    })

    return () => {
      bondSubscribers.delete(bond)
      unsubscribe()
    }
  }

  return { get, set, dispatch, subscribe, subscribeBond }
}
