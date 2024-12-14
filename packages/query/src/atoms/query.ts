import { atom } from '@molecular/core'

// Types
import type { Atom } from '@molecular/core'

const DEFAULT_QUERY_STATE = {
  data: null,
  metaData: {
    loading: false,
    error: null
  }
}

export const createQueryAtom = <T>(): Atom<T> => {
  return atom(DEFAULT_QUERY_STATE, {}, 'readonly')
}
