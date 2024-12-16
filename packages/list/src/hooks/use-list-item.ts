import { useAtomValue, useAtomActions } from '@molecular/core'

// Types
import type { Molecule } from '@molecular/core'
import type { ListAtom } from '../types'

export const useListItem = <T>(molecule: Molecule, listAtomKey: string, key: string) => {
  const listAtom = molecule.atoms.find((atom) => atom.key === listAtomKey) as ListAtom<T>

  if (!listAtom) {
    throw new Error(`List atom with key "${listAtomKey}" not found in molecule.`)
  }

  const listState = useAtomValue(listAtom)
  const itemAtom = listState.items.get(key)

  if (!itemAtom) {
    throw new Error(`Item with KEY "${key}" not found in list atom.`)
  }

  const itemState = useAtomValue(itemAtom)
  const actions = useAtomActions(itemAtom)

  return { state: itemState, actions }
}
