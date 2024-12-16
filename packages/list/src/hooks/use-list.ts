import { useStore, useAtomValue } from '@molecular/core'
import { useCallback } from 'react'

// Types
import type { Molecule } from '@molecular/core'
import type { ListAtom } from '../types'

export const useList = <T>(molecule: Molecule, listAtomKey: string) => {
  const store = useStore()
  const listAtom = molecule.atoms.find((atom) => atom.key === listAtomKey) as ListAtom<T>

  if (!listAtom) {
    throw new Error(`List atom with key "${listAtomKey}" not found in molecule.`)
  }

  const state = useAtomValue(listAtom)

  const addItem = useCallback(
    (item: T) => {
      store.dispatch(listAtom, 'addItem', item)
    },
    [store]
  )

  const removeItem = useCallback(
    (id: string) => {
      store.dispatch(listAtom, 'removeItem', id)
    },
    [store]
  )

  return {
    itemIds: Array.from(state.items.keys()),
    addItem,
    removeItem
  }
}
