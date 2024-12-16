import type { Atom, Bond, Molecule } from '../types'

export const createMolecule = (
  atoms: Atom<unknown>[],
  bonds?: Bond<unknown, unknown>[]
): Molecule => {
  if (bonds) {
    const atomSet = new Set(atoms)

    bonds.forEach(({ source, target }) => {
      if (!atomSet.has(source)) {
        throw new Error(
          `Invalid bond: The source atom "${source.key}" is not included in the atoms array.`
        )
      }

      if (!atomSet.has(target)) {
        throw new Error(
          `Invalid bond: The target atom "${target.key}" is not included in the atoms array.`
        )
      }
    })
  }

  return { atoms, bonds }
}
