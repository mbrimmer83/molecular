import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from '../react/provider'
import { useAtom } from '../react/use-atom'
import { createAtom } from '../lib/atom'

// Utility to create the wrapper for renderHook
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => <Provider>{children}</Provider>
}

// Utility to create a test atom with a given initial state and actions
const createTestAtom = () => {
  const testAtom = createAtom(
    'testAtom',
    { count: 0 },
    {
      increment: (get, set) => {
        const { count } = get(testAtom)
        set(testAtom, { count: count + 1 })
      },
      init: (_, set) => {
        set(testAtom, { count: 0 })
      }
    }
  )

  return testAtom
}

describe('useAtom', () => {
  let testAtom: ReturnType<typeof createTestAtom>
  let wrapper: ReturnType<typeof createWrapper>

  beforeEach(() => {
    testAtom = createTestAtom()
    wrapper = createWrapper()
  })
  it('initializes the atom and allows access via useAtom', () => {
    const { result } = renderHook(() => useAtom(testAtom), { wrapper })
    const [state] = result.current

    expect(state).toEqual({ count: 0 })
  })

  it('updates state correctly via increment action', () => {
    const { result } = renderHook(() => useAtom(testAtom), { wrapper })

    let [state, actions] = result.current

    expect(state).toEqual({ count: 0 })

    act(() => {
      actions.increment()
    })
    ;[state] = result.current

    expect(state).toEqual({ count: 1 })
  })

  it('subscribes and reacts to state updates correctly', () => {
    const { result, rerender } = renderHook(() => useAtom(testAtom), { wrapper })

    let [state, actions] = result.current

    expect(state).toEqual({ count: 0 })

    act(() => {
      actions.increment()
    })

    rerender()
    ;[state] = result.current

    expect(state).toEqual({ count: 1 })
  })

  it('calls init action when atom is initialized by useAtom', () => {
    const { result, rerender } = renderHook(() => useAtom(testAtom), { wrapper })

    let [state, actions] = result.current

    expect(state).toEqual({ count: 0 })

    act(() => {
      actions.increment()
    })

    rerender()
    ;[state] = result.current

    expect(state).toEqual({ count: 1 })
  })
})
