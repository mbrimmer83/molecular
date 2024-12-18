import MarkdownWithHighlighting from '../components/markdown'

const markdown = `
# Atoms
&nbsp;

Atoms are the fundamental building blocks of state in Molecular. They represent **small, isolated units of state** that can be shared across your application. Atoms are designed to be simple, composable, and reactive.
&nbsp;
## Key Features of Atoms:
- **Minimal State:** An atom holds a single slice of state.
- **Composable:** Atoms can be combined into more complex structures using Molecules.
- **Immutable Updates:** State updates are predictable and avoid mutation.
- **Actions:** Atoms can define custom actions to modify their state.
&nbsp;

&nbsp;

## Defining an Atom
&nbsp;

You can create an Atom using the \`createAtom\` function. Here's an example of a simple counter atom:
&nbsp;

\`\`\`typescript
import { createAtom } from '@molecular/core'

// Define an atom named 'counter' with an initial state
const counter = createAtom(
  'counterAtom', // Key
  { count: 0 }, // Initial state
  {
    increment: (get, set) => {
      const { count } = get()
      set({ count: count + 1 }) // Update state immutably
    },
    decrement: (get, set) => {
      const { count } = get()
      set({ count: count - 1 }) // Update state immutably
    }
  }
)

export default counter
\`\`\`
&nbsp;

## Example Usage
&nbsp;
\`\`\`tsx
import { useMolecule } from '@molecular/core'
import counter from './atoms/counter'

function Counter() {
  const [state, actions] = useMolecule(counter)

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
    </div>
  )
}
\`\`\`
&nbsp;
---
&nbsp;
## Why Use Atoms?
&nbsp;
Atoms allow you to build state in a way that is:
&nbsp;
Predictable – Each atom represents an independent unit of state.
Scalable – Atoms can be easily composed into larger molecules.
Maintainable – State and actions are co-located, improving clarity.
`

export default function Atoms() {
  return <MarkdownWithHighlighting markdown={markdown} />
}
