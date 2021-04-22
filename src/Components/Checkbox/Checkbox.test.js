import React from 'react'
import Checkbox from './Checkbox'
import {render, screen, fireEvent} from '@testing-library/react'

describe('<Checkbox>', () => {
  const onChange = jest.fn(e => {
    e.target.checked = !e.target.checked
  })

  it('should call onChange function', async () => {
    render(<Checkbox onChange={onChange} />)
    const elem = await screen.findByTestId(/checkbox/i)

    expect(elem.checked).toEqual(false)

    fireEvent.click(elem)

    expect(elem.checked).toEqual(true)
    expect(onChange.mock.calls.length).toEqual(1)
  })
})
