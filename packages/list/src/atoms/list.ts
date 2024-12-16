import { createAtom } from '@molecular/core'

// Types
import type { Atom } from '@molecular/core'
import type { ListAtom } from '../types'

export const createListAtom = <T>(
  key: string,
  initialItems: T[],
  generateId: (item: T) => string
): ListAtom<T> => {
  const itemAtoms = new Map<string, Atom<T>>()

  initialItems.forEach((item) => {
    const id = generateId(item)
    const itemAtom = createAtom(id, { ...item })
    itemAtoms.set(id, itemAtom)
  })

  const listAtom = createAtom(
    key,
    { items: itemAtoms },
    {
      addItem: (get, set, newItem: T) => {
        const id = generateId(newItem)
        const current = get(listAtom)
        const newItemAtom = createAtom(id, { ...newItem })
        current.items.set(id, newItemAtom)
        set(listAtom, { ...current }) // Trigger reactivity
      },
      removeItem: (get, set, id: string) => {
        const current = get(listAtom)
        current.items.delete(id)
        set(listAtom, { ...current })
      }
    }
  )

  return listAtom
}
