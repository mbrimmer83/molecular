import type { Molecule } from '../types'

export const atomByKind = (molecule: Molecule, kind: string) => {
  return molecule.atoms.find((atom) => atom.kind === kind)
}
