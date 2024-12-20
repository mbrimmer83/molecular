import { useEffect } from 'react'
import { useStore } from './use-store'
import type { Molecule } from '../types'

export const useMolecule = (molecule: Molecule) => {
  const store = useStore()

  useEffect(() => {
    const unsubscribers: (() => void)[] = []

    // Subscribe to all atoms in the molecule
    molecule.atoms.forEach((atom) => {
      const unsubscribe = store.subscribe(atom, () => {
        // No-op: Subscriptions are needed, but we don't handle state here
      })
      unsubscribers.push(unsubscribe)
    })

    // Subscribe to bonds in the molecule
    molecule.bonds?.forEach((bond) => {
      const unsubscribe = store.subscribeBond(bond)
      unsubscribers.push(unsubscribe)
    })

    // Cleanup all subscriptions on unmount
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe())
    }
  }, [molecule, store])
}
