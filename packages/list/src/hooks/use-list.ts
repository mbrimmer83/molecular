import { useStore, useAtomValue, atomByKind } from '@molecular/core'
import { useCallback } from 'react'

// Types
import type { Molecule } from '@molecular/core'
import type { ListAtom } from '../types'

export const useList = <T>(molecule: Molecule) => {
  const store = useStore()
  const listAtom = atomByKind(molecule, '__listAtom') as ListAtom<T>

  if (!listAtom) {
    throw new Error(`List atom not found in molecule.`)
  }

  const state = useAtomValue(listAtom)

  const addItem = useCallback(
    (item: T) => {
      store.dispatch(listAtom, 'addItem', item)
    },
    [listAtom, store]
  )

  const removeItem = useCallback(
    (id: string) => {
      store.dispatch(listAtom, 'removeItem', id)
    },
    [listAtom, store]
  )

  return [
    Array.from(state.items.keys()),
    {
      addItem,
      removeItem
    }
  ]
}
