import { useEffect, useMemo, useState } from 'react'
import { useStore } from './use-store'

// Types
import type { Molecule } from '../types'

export const useMolecule = (molecule: Molecule) => {
  const store = useStore()

  const [state, setState] = useState(() =>
    molecule.atoms.reduce((acc, atom) => {
      acc[atom.key] = store.get(atom)
      return acc
    }, {} as Record<string, unknown>)
  )

  useEffect(() => {
    const unsubscribers: (() => void)[] = []

    // Set up subscriptions for atoms
    molecule.atoms.forEach((atom) => {
      const unsubscribe = store.subscribe(atom, () => {
        setState((prevState) => ({
          ...prevState,
          [atom.key]: store.get(atom)
        }))
      })
      unsubscribers.push(unsubscribe)
    })

    // Set up bonds
    molecule.bonds?.forEach(({ source, target, transform }) => {
      const unsubscribe = store.subscribe(source, () => {
        const transformedState = transform(store.get(source))
        store.set(target, transformedState)
      })
      unsubscribers.push(unsubscribe)
    })

    // Cleanup
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [molecule, store])

  // Combine actions from all atoms
  const actions = useMemo(() => {
    return molecule.atoms.reduce((acc, atom) => {
      Object.entries(atom.actions).forEach(([actionKey, actionFn]) => {
        acc[actionKey] = (...args: unknown[]) => store.dispatch(atom, actionKey, ...args)
      })
      return acc
    }, {} as Record<string, (...args: unknown[]) => unknown>)
  }, [molecule, store])

  return { state, actions }
}
