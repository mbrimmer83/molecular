import React from 'react'
import { Provider } from '@molecular/core'

export function withProvider<P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    )
  }
}
