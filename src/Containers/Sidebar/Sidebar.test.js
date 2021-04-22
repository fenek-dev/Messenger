import React from 'react'
import Sidebar from './Sidebar'
import {render, screen} from '@testing-library/react'
import configureStore from 'redux-mock-store'
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'
import {Provider} from 'react-redux'
const mockStore = configureStore([])

describe('<Sidebar>', () => {
  const initialState = {
    chats: [
      {
        chat_id: 'chatid',
        companion_id: 'companionid',
        companion_name: 'Maks',
        last_message: 'How are you',
        created_at: '12:20',
      },
    ],
    user: {
      user_id: 'userid',
    },
  }
  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar title="Arthur" />
      </MemoryRouter>
    </Provider>,
  )
  it('should render correctly', async () => {
    expect(await screen.findByText(/Arthur/i)).toBeInTheDocument()
  })
})
