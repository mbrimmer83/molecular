import { useEffect, useMemo } from 'react'
import { useAtomValue, useAtomActions, atomByKind, useMolecule } from '@molecular/core'

// Types
import type { Molecule } from '@molecular/core'

export const useQuery = (molecule: Molecule, queryArgs: any) => {
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

  useEffect(() => {
    const init = async () => {
      if (actions.query) {
        await actions.query(queryArgs)
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state, actions]
}
