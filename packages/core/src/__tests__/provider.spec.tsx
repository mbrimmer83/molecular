import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from '../react/provider'
import { useStore } from '../react/use-store'

describe('Provider', () => {
  it('initializes the store and allows access via useStore', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <Provider>{children}</Provider>

    const { result } = renderHook(() => useStore(), { wrapper })

    expect(result.current).toBeDefined()
    expect(typeof result.current.get).toBe('function')
    expect(typeof result.current.set).toBe('function')
    expect(typeof result.current.dispatch).toBe('function')
    expect(typeof result.current.subscribe).toBe('function')
  })
})
