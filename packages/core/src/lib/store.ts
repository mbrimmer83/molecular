import type { Atom } from './atom';

export type Store = {
  get: <T>(atom: Atom<T>) => T;
  set: <T>(atom: Atom<T>, newState: Partial<T>) => T;
  dispatch: <T>(atom: Atom<T>, action: string, push?: () => void) => void;
  subscribe: <T>(atom: Atom<T>, callback: Subscriber<T>) => void;
};

type Subscriber<T> = (state: T) => void;

export const createStore = (): Store & {
  subscribe: <T>(atom: Atom<T>, callback: Subscriber<T>) => void;
} => {
  const state = new WeakMap<Atom<any>, any>();
  const subscribers = new WeakMap<Atom<any>, Subscriber<any>[]>();

  const get = <T>(atom: Atom<T>): T => {
    if (!state.has(atom)) {
      state.set(atom, atom.initialState);
    }
    return state.get(atom);
  };

  const set = <T>(atom: Atom<T>, newState: Partial<T>): T => {
    const currentState = get(atom);
    const updatedState = { ...currentState, ...newState };
    state.set(atom, updatedState);

    if (subscribers.has(atom)) {
      subscribers.get(atom)?.forEach((callback) => callback(updatedState));
    }

    return updatedState;
  };

  const dispatch = <T>(
    atom: Atom<T>,
    action: string,
    push?: () => void
  ): void => {
    if (atom.actions && atom.actions[action]) {
      atom.actions[action](get, set, push || (() => {}));
    } else {
      throw new Error(`Action "${action}" not found on atom.`);
    }
  };

  const subscribe = <T>(atom: Atom<T>, callback: Subscriber<T>) => {
    if (!subscribers.has(atom)) {
      subscribers.set(atom, []);
    }
    subscribers.get(atom)?.push(callback);
  };

  return { get, set, dispatch, subscribe };
};
