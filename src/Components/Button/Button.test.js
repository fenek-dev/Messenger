import React from 'react'
import Button from './Button'
import {render, screen, fireEvent} from '@testing-library/react'

describe('<Button>', () => {
  const onClick = jest.fn()
  const label = 'Click'
  const bgColor = 'white'

  it('should call onClick function', async () => {
    render(<Button label={label} onClick={onClick} />)
    const btn = await screen.findByText(label)
    fireEvent.click(btn)
    expect(onClick.mock.calls.length).toBe(1)
  })

  it('should change background color', async () => {
    render(
      <Button
        label={label}
        onClick={onClick}
        style={{backgroundColor: bgColor}}
      />,
    )
    const btn = await screen.findByText(label)
    expect(btn.style.backgroundColor).toEqual(bgColor)
  })
})

export {}
