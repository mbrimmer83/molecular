/* eslint-disable @typescript-eslint/ban-ts-comment */
import { withProvider } from '../components/with-provider'
import { createMolecule, createBond } from '@molecular/core'
import { useList, useListItem } from '@molecular/list'
import { useLazyQuery, QueryState } from '@molecular/query'
import MarkdownWithHighlighting from '../components/markdown'
import { listAtomNoData, type Item } from '../components/count-list-atom'
import { queryAtom } from '../components/query-count-list-atom'
import QueryButton from '../components/query-button'

const bond = createBond(
  // @ts-ignore
  queryAtom,
  listAtomNoData,
  (sourceState: QueryState<Item[]>, targetState: Item[], dispatch: any) => {
    console.log('Bond Triggered', sourceState, targetState)
    sourceState?.data?.forEach((item) => {
      dispatch(listAtomNoData, 'addItem', item)
    })
  }
)

// @ts-ignore
const listMolecule = createMolecule([queryAtom, listAtomNoData], [bond])

const ExamplesList = () => {
  const [state, query] = useLazyQuery(listMolecule)
  // @ts-ignore
  const { metaData } = state
  const { loading, error } = metaData
  const [ids] = useList(listMolecule)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Examples</h1>
      <MarkdownWithHighlighting markdown={markdown} />
      <div className="my-10">
        {/* @ts-ignore */}
        <QueryButton onClick={() => query({})} label="Query" loading={loading} />

        {/* Error State */}
        {error && (
          <div className="text-red-500 font-medium my-4">Something went wrong: {String(error)}</div>
        )}
      </div>
      <div className="space-y-4">
        {ids?.map((id: string) => (
          <ExamplesListItem key={id} id={id} />
        ))}
      </div>
      <div className="h-60" />
    </div>
  )
}

const ExamplesListItem = ({ id }: { id: string }) => {
  const [item, actions] = useListItem(listMolecule, id)

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-bold">{item?.name}</h2>
      <p className="text-md">Count: {item?.count}</p>
      <div className="flex space-x-4 mt-2">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={actions?.increment}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={actions?.decrement}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default withProvider(ExamplesList)

const markdown = `
\`\`\`tsx
import { createMolecule, type AtomStoreContext, type Atom } from '@molecular/core';
import { createListAtom, useList, useListItem } from '@molecular/list';
import { useLazyQuery, QueryState } from '@molecular/query'
import { listAtomNoData, type Item } from '../components/count-list-atom'
import { queryAtom } from '../components/query-count-list-atom'

// Bond query and list atoms together
const bond = createBond(
  queryAtom,
  listAtomNoData,
  (sourceState: QueryState<Item[]>, targetState: Item[], dispatch: any) => {
    console.log('Bond Triggered', sourceState, targetState)
    sourceState?.data?.forEach((item) => {
      dispatch(listAtomNoData, 'addItem', item)
    })
  }
)

const listMolecule = createMolecule([queryAtom, listAtomNoData], [bond])

const ExamplesList = () => {
  const [state, query] = useLazyQuery(listMolecule)
  const { metaData } = state
  const { loading, error } = metaData
  const [ids] = useList(listMolecule)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Examples</h1>
      <MarkdownWithHighlighting markdown={markdown} />
      <div className="my-10">
        <QueryButton onClick={() => query({})} label="Query" loading={loading} />

        {error && (
          <div className="text-red-500 font-medium my-4">Something went wrong: {String(error)}</div>
        )}
      </div>
      <div className="space-y-4">
        {ids?.map((id: string) => (
          <ExamplesListItem key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

const ExamplesListItem = ({ id }: { id: string }) => {
  const [item, actions] = useListItem(listMolecule, id)

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-bold">{item?.name}</h2>
      <p className="text-md">Count: {item?.count}</p>
      <div className="flex space-x-4 mt-2">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={actions?.increment}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={actions?.decrement}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
\`\`\`
`
