/* eslint-disable @typescript-eslint/ban-ts-comment */
import { withProvider } from '../components/with-provider'
import { createMolecule } from '@molecular/core'
import { useList, useListItem } from '@molecular/list'
import MarkdownWithHighlighting from '../components/markdown'
import { listAtom } from '../components/count-list-atom'

// @ts-ignore
const listMolecule = createMolecule([listAtom])

const ExamplesList = () => {
  const [ids] = useList(listMolecule)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Examples</h1>
      <MarkdownWithHighlighting markdown={markdown} />
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

interface Item {
  id: string;
  name: string;
  count: number;
}

const LIST: Item[] = [
  { id: '1', name: 'Item 1', count: 0 },
  { id: '2', name: 'Item 2', count: 0 },
  { id: '3', name: 'Item 3', count: 0 },
];

const addActionsToAtom = (atom: Atom<any>) => {
  atom.actions = {
    ...atom.actions,
    increment: (store: AtomStoreContext<any>) => {
      const { get, set } = store;
      const { count } = get(atom);
      set(atom, { count: count + 1 });
    },
    decrement: (store: AtomStoreContext<any>) => {
      const { get, set } = store;
      const { count } = get(atom);
      set(atom, { count: count - 1 });
    },
  };

  return atom;
};

const listAtom = createListAtom<Item>('list', LIST, (item: Item) => item.id, addActionsToAtom);
const listMolecule = createMolecule([listAtom]);

const ExamplesList = () => {
  const [ids] = useList(listMolecule);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Examples</h1>
      <p className="mb-6">Molecular is designed to make state management intuitive and powerful.</p>
      <div className="space-y-4">
        {ids?.map((id: string) => (
          <ExamplesListItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

const ExamplesListItem = ({ id }: { id: string }) => {
  const [item, actions] = useListItem(listMolecule, id);

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-bold">{item?.name}</h2>
      <p className="text-gray-700">Count: {item?.count}</p>
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
  );
};
\`\`\`
`
