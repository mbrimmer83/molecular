import { createAtom } from '@molecular/core'

// Types
import type { Atom } from '@molecular/core'
import type { ListAtom } from '../types'

export const createListAtom = <T>(
  key: string,
  initialItems: T[],
  generateId: (item: T) => string,
  addItemActions?: <T>(atom: Atom<T>) => Atom<T>
): ListAtom<T> => {
  const itemAtoms = new Map<string, Atom<T>>()

  initialItems.forEach((item) => {
    const id = generateId(item)
    let itemAtom = createAtom(id, { ...item })
    if (addItemActions) {
      itemAtom = addItemActions(itemAtom)
    }
    itemAtoms.set(id, itemAtom)
  })

  const listAtom = createAtom(
    key,
    { items: itemAtoms },
    {
      addItem: (store, _app, newItem: T) => {
        const { get, set } = store
        const id = generateId(newItem)
        const current = get(listAtom)
        let newItemAtom = createAtom(id, { ...newItem })
        if (addItemActions) {
          newItemAtom = addItemActions(newItemAtom)
        }

        current.items.set(id, newItemAtom)
        set(listAtom, { ...current }) // Trigger reactivity
      },
      removeItem: (store, _app, id: string) => {
        const { get, set } = store
        const current = get(listAtom)
        current.items.delete(id)
        set(listAtom, { ...current })
      }
    },
    '__listAtom'
  )

  return listAtom
}
