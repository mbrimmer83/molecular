import { createAtom } from '@molecular/core'
import { getSharedActions } from '../actions/shared-actions'

// Types
import type { Atom, AtomStoreContext, AtomAppContext } from '@molecular/core'

export type QueryKey = string | string[]

export type QueryState<T> = {
  data: T | null
  metaData: {
    loading: boolean
    error: any | null
  }
}

export type QueryFn<T> = (
  store: AtomStoreContext<QueryState<T>>,
  app: AtomAppContext,
  ...args: any[]
) => Promise<T>

export interface QueryAtomOptions<T extends QueryState<any>> {
  key: string
  queryKey?: QueryKey
  queryFn: QueryFn<T['data']>
  cacheTime?: number
}

export const createQueryAtom = <T extends QueryState<any>>(
  options: QueryAtomOptions<T>
): Atom<QueryState<T>> => {
  const atom = createAtom<QueryState<T>>(
    options.key,
    {
      data: null,
      metaData: { loading: false, error: null }
    },
    { queryFn: options.queryFn },
    '__queryAtom'
  )

  return getSharedActions<T>(atom)
}
