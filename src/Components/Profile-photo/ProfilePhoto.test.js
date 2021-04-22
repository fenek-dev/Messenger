import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('<ProfilePhoto>', () => {
  render(<ProfilePhoto />)

  it('should render correctly', async () => {
    const img = await screen.findByAltText(/user/i)

    expect(img).toBeInTheDocument()

    userEvent.click(img)

    const openedImg = await screen.findByAltText(/opened user/i)

    expect(openedImg).toBeInTheDocument()
  })
})
