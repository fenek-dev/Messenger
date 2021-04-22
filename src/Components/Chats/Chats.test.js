import React from 'react'
import Chats from './Chats'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'

describe('<Chats>', () => {
  const chats = [
    {
      chat_id: 'chatid',
      companion_id: 'companionid',
      companion_name: 'Arthur',
      last_message: 'How are you',
      created_at: '12:20',
    },
  ]

  render(
    <MemoryRouter>
      <Chats chats={chats} />
    </MemoryRouter>,
  )

  it('should render correctly', async () => {
    expect(await screen.findByText(chats[0].last_message)).toBeInTheDocument()
    expect(await screen.findByText(chats[0].created_at)).toBeInTheDocument()
  })
})
