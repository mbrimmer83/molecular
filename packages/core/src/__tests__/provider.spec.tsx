import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { Provider } from '../react/provider.tsx';
import { useStore } from '../react/use-store.ts';

describe('Provider', () => {
  it('initializes the store and allows access via useStore', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider>{children}</Provider>
    );

    const { result } = renderHook(() => useStore(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current.get).toBe('function');
    expect(typeof result.current.set).toBe('function');
  });
});
