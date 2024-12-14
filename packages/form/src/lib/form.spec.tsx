import { render } from '@testing-library/react'

import Form from './form'

describe('Form', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Form />)
    expect(baseElement).toBeTruthy()
  })
})
