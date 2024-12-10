export type Get<T> = (atom: Atom<T>) => T;

export type Set<T> = (atom: Atom<T>, newState: Partial<T>) => Partial<T>;

export type Push<S, T> = (get: Get<S>, set: Set<T>) => void;

export type Atom<T> = {
  initialState: T;
  actions?: {
    [key: string]: (get: Get<T>, set: Set<T>, push: () => void) => void;
  };
};

export type AtomActions<T> = {
  [key: string]: (get: Get<T>, set: Set<T>) => void;
};
export function atom<T>(initialState: T, actions?: AtomActions<T>): Atom<T> {
  return {
    initialState,
    actions,
  };
}
