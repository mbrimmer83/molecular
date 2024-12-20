import { type AtomStoreContext, type Atom } from '@molecular/core'
import { createListAtom } from '@molecular/list'

export interface Item {
  id: string
  name: string
  count: number
}

const LIST: Item[] = [
  { id: '1', name: 'Item 1', count: 0 },
  { id: '2', name: 'Item 2', count: 0 },
  { id: '3', name: 'Item 3', count: 0 }
]

const addActionsToAtom = (atom: Atom<any>) => {
  atom.actions = {
    ...atom.actions,
    increment: (store: AtomStoreContext<any>) => {
      const { get, set } = store
      const state = get(atom)
      set(atom, { ...state, count: state.count + 1 })
    },
    decrement: (store: AtomStoreContext<any>) => {
      const { get, set } = store
      const state = get(atom)
      set(atom, { ...state, count: state.count - 1 })
    }
  }

  return atom
}

export const listAtom = createListAtom<Item>(
  'list',
  LIST,
  (item: Item) => item.id,
  addActionsToAtom
)

export const listAtomNoData = createListAtom<Item>(
  'listNoData',
  [],
  (item: Item) => item.id,
  addActionsToAtom
)
