import { useAtomValue, useAtomActions, atomByKind } from '@molecular/core'

// Types
import type { Molecule } from '@molecular/core'
import type { ListAtom } from '../types'

export const useListItem = <T>(molecule: Molecule, key: string) => {
  const listAtom = atomByKind(molecule, '__listAtom') as ListAtom<T>

  if (!listAtom) {
    throw new Error(`List atom not found in molecule.`)
  }

  const listState = useAtomValue(listAtom)
  const itemAtom = listState.items.get(key)

  if (!itemAtom) {
    throw new Error(`Item with KEY "${key}" not found in list atom.`)
  }

  const itemState = useAtomValue(itemAtom)
  const actions = useAtomActions(itemAtom)

  return [itemState, actions]
}
