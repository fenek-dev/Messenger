import React from 'react'
import FileInput from './FileInput'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<FileInput>', () => {
  const label = 'Add photo'
  const className = 'class'
  const onChange = jest.fn(e => {})

  render(<FileInput label={label} className={className} onChange={onChange} />)

  it('should render correctly', async () => {
    const labelElem = await screen.findByText(label)
    const input = await screen.findByTestId(/input/i)

    expect(labelElem).toBeInTheDocument()
    expect(labelElem).toBeVisible()
    expect(input.classList[1]).toEqual(className)

    fireEvent.change(input, {target: {files: ['Hello']}})

    expect(onChange.mock.calls.length).toEqual(1)
  })
})
