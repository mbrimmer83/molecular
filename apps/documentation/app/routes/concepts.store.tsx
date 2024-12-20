import MarkdownWithHighlighting from '../components/markdown'

const markdown = `
# Store

## Key Concepts
- State Management
  - &nbsp;&nbsp;&nbsp;&nbsp;The state of atoms is stored in a WeakMap to ensure memory efficiency and garbage collection of unused atoms.
  - &nbsp;&nbsp;&nbsp;&nbsp;The get method initializes an atom's state lazily if it hasn't been set yet.
- Subscriptions
  - &nbsp;&nbsp;&nbsp;&nbsp;Subscribers are managed using a Map, where each atom has a Set of subscribers.
  - &nbsp;&nbsp;&nbsp;&nbsp;The subscribe method adds a subscriber callback for an atom and returns an unsubscribe function.
- Bonds
  - &nbsp;&nbsp;&nbsp;&nbsp;Bonds are used to link the state of one atom (source) to another (target).
  - &nbsp;&nbsp;&nbsp;&nbsp;The push function in a bond propagates updates from the source atom to the target atom.
- Actions
  - &nbsp;&nbsp;&nbsp;&nbsp;Actions are atom-specific methods that allow encapsulating business logic.
  - &nbsp;&nbsp;&nbsp;&nbsp;The dispatch method dynamically invokes these actions with arguments.
- Efficient Updates
  - &nbsp;&nbsp;&nbsp;&nbsp;State updates are skipped if the new state is the same as the current state (Object.is).
  - &nbsp;&nbsp;&nbsp;&nbsp;Subscribers are notified only when the state changes.

`

export default function Store() {
  return <MarkdownWithHighlighting markdown={markdown} />
}
