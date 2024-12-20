import { type QueryState, createQueryAtom } from '@molecular/query'

interface Items {
  id: number
  name: string
  count: number
}

const DATA: Items[] = [
  { id: 1, name: 'Item 1', count: 0 },
  { id: 2, name: 'Item 2', count: 0 },
  { id: 3, name: 'Item 3', count: 0 }
]

export const queryAtom = createQueryAtom<QueryState<Items[]>>({
  key: 'queryAtom',
  queryFn: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(DATA), 1500))
  }
})
