/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createMolecule } from '@molecular/core'
import { useLazyQuery } from '@molecular/query'
import { withProvider } from '../components/with-provider'
import MarkdownWithHighlighting from '../components/markdown'
import QueryButton from '../components/query-button'
import { queryAtom } from '../components/query-count-list-atom'

// @ts-ignore
const queryMolecule = createMolecule([queryAtom])

const ExamplesQuery = () => {
  const [state, query] = useLazyQuery(queryMolecule)
  // @ts-ignore
  const { data, metaData } = state
  const { loading, error } = metaData

  if (loading) {
    console.log('Loading Data...')
  } else if (data) {
    console.log('Data Loaded:', data)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Query Examples</h1>
      <MarkdownWithHighlighting markdown={markdown} />

      <div className="my-10">
        {/* @ts-ignore */}
        <QueryButton onClick={() => query({})} label="Query" loading={loading} />

        {/* Error State */}
        {error && (
          <div className="text-red-500 font-medium my-4">Something went wrong: {String(error)}</div>
        )}
      </div>

      {/* Data Display */}
      {!loading && data && (
        <ul className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
          {data.map((item: any) => (
            <li key={item.id} className="p-2 border-b border-gray-700 last:border-none">
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <div className="h-60" />
    </div>
  )
}

export default withProvider(ExamplesQuery)

const markdown = `
\`\`\`typescript
import { createMolecule } from '@molecular/core'
import { type QueryState, createQueryAtom, useLazyQuery } from '@molecular/query'

// Define the data structure
interface Items {
  id: number
  name: string
}

// Example data
const DATA: Items[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
]

// Create a query atom
const queryAtom = createQueryAtom<QueryState<Items[]>>({
  key: 'queryAtom',
  queryFn: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(DATA), 3000))
  }
})

// Combine atoms into a molecule
const queryMolecule = createMolecule([queryAtom])

// Example component using the query molecule
export default function ExamplesQuery() {
  const [state, query] = useLazyQuery(queryMolecule)
  const { data, metaData } = state
  const { loading, error } = metaData

  return (
    <div>
      <h1>Query Examples</h1>
      <button onClick={() => query({})}>Query</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {String(error)}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
\`\`\`
`
