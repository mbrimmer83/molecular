import { describe, it, expect } from 'vitest';
import { atom } from '../lib/atom';

describe('atom', () => {
  it('should initialize with default state', () => {
    const testAtom = atom(
      { count: 0 },
      {
        action: (get, set) => {
          const { count } = get(testAtom);
          set(testAtom, { count: count + 1 });
        },
      }
    );

    expect(testAtom).toBeDefined();
    expect(testAtom.initialState).toEqual({ count: 0 });
    expect(testAtom.actions?.action).toBeDefined();
    expect(testAtom.actions?.action).toBeInstanceOf(Function);
  });
});
