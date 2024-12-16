import { createAtom } from '@molecular/core'

// Types
import type { Atom } from '@molecular/core'

const DEFAULT_QUERY_STATE = {
  data: null,
  metaData: {
    loading: false,
    error: null
  }
}

export const createQueryAtom = <T>(key: string): Atom<T> => {
  return createAtom(key, DEFAULT_QUERY_STATE, {}, 'readonly')
}
