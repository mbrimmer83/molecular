import type { Atom } from '@molecular/core'

export type ListAtom<T> = Atom<{
  items: Map<string, Atom<T>>
}>
