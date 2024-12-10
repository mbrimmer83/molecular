import type { Atom } from './atom';
import type { Bond } from './bond';

export type Molecule = {
  get: (key: string) => any;
  set: (key: string, newState: any) => void;
  push: (key: string) => void;
  registerPush: (key: string, pushFn: () => void) => void;
};

export const createMolecule = (...args: (Atom<any> | Bond)[]): Molecule => {
  const state = new WeakMap<string, any>();
  const pushFunctions = new Map<string, () => void>();
};

createMolecule(pipe(QueryAtom, ListAtom, ListItemAtom));
