import { useCallback, useMemo } from 'react'
import { useAtomValue, useAtomActions, atomByKind, useMolecule } from '@molecular/core'

// Types
import type { Molecule } from '@molecular/core'

export const useLazyQuery = (molecule: Molecule) => {
  useMolecule(molecule)
  const queryAtom = useMemo(() => {
    const atom = atomByKind(molecule, '__queryAtom')

    if (!atom) {
      throw new Error('Query atom not found in molecule.')
    }

    return atom
  }, [molecule])

  const state = useAtomValue(queryAtom)
  const actions = useAtomActions(queryAtom)

  const query = useCallback(
    async (args: any) => {
      if (actions.query) {
        await actions.query(args)
      }
    },
    [actions]
  )

  return [state, query, actions]
}
