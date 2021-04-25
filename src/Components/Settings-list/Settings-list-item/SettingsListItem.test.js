import React from 'react'
import SettingsListItem from './SettingsListItem'
import {render, screen, fireEvent} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('<SettingsListItem>', () => {
  const text = 'Item'
  const onClick = jest.fn()
  const link = 'configuration'

  beforeEach(() => {
    render(
      <MemoryRouter>
        <SettingsListItem text={text} onClick={onClick} link={link} />
      </MemoryRouter>,
    )
  })

  it('should render correctly', async () => {
    const textElem = await screen.findByText(text)
    expect(textElem).toBeInTheDocument()
    expect(textElem).toBeVisible()
  })

  it('should call onClick funtion', async () => {
    const wrapper = await screen.findByTestId(/wrapper/i)
    fireEvent.click(wrapper)
    expect(onClick.mock.calls.length).toEqual(1)
  })
})
