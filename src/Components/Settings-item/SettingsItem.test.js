import React from 'react'
import SettingsItem from './SettingsItem'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<SettingsItem>', () => {
  const onClick = jest.fn()

  beforeEach(() => {
    render(
      <SettingsItem onClick={onClick}>
        <p>Setting item</p>
      </SettingsItem>,
    )
  })

  it('should render correctly', async () => {
    const children = await screen.findByText(/Setting item/i)
    expect(children).toBeInTheDocument()
    expect(children).toBeVisible()
  })

  it('should call onClick function', async () => {
    const wrapper = await screen.findByTestId(/wrapper/i)
    fireEvent.click(wrapper)
    expect(onClick.mock.calls.length).toEqual(1)
  })
})
