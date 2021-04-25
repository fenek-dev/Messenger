import React from 'react'
import ListItem from './ListItem'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {MemoryRouter} from 'react-router-dom'

describe('<ListItem>', () => {
  const props = {
    name: 'Arthur Moore',
    companion_id: '12',
    photoUrl:
      'https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
    lastMessage: 'Hello, my friend',
    date: '12:20',
    className: 'class',
  }

  render(
    <MemoryRouter>
      <ListItem {...props} />
    </MemoryRouter>,
  )

  it('should render correctly', async () => {
    const name = await screen.findByText(props.name)
    const lastMessage = await screen.findByText(props.lastMessage)
    const date = await screen.findByText(props.date)
    expect(name).toBeInTheDocument()
    expect(name).toBeVisible()
    expect(lastMessage).toBeInTheDocument()
    expect(lastMessage).toBeVisible()
    expect(date).toBeInTheDocument()
    expect(date).toBeVisible()

    const img = await screen.findByAltText(/avatar/i)
    expect(img.getAttribute('src')).toEqual(props.photoUrl)
    expect(img).toBeInTheDocument()

    const wrapper = await screen.findByTestId(/wrapper/i)
    expect(wrapper.classList[1]).toEqual(props.className)
  })
})
