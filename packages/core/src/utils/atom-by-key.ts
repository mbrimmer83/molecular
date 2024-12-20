import type { Molecule } from '../types'

export const atomByKey = (molecule: Molecule, key: string) => {
  return molecule.atoms.find((atom) => atom.key === key)
}
