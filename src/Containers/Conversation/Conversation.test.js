import React from 'react'
import Conversation from './Conversation'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store' 
import { MemoryRouter, Route } from 'react-router-dom'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

const mockStore = configureStore([])

describe('<Conversation>',()=> {
    const initialState = {
        chats: [{
            chat_id: 'chatid',
            companion_id: 'companionid',
            companion_name: 'Maks',
            last_message: 'How are you', 
            created_at: '12:20',
            messages: [{
                from: 'Me',
                body: 'How are you',
                created_at: 1606990277369,
                received: false
            },
            {
                from: 'companionid',
                body: 'Well',
                created_at: 1606990277370,
                received: false
            }]
        }],
        user: {
            user_id: 'userid'
            }
        }
        const store = mockStore(initialState)

        render(<Provider store={store}><MemoryRouter initialEntries={['/companionid']} > <Route path='/:id'><Conversation/></Route></MemoryRouter></Provider>)

        it('should render correctly', async() => {
            expect(await screen.findByText(initialState.chats[0].messages[0].body)).toBeInTheDocument()
            expect(await screen.findByText(initialState.chats[0].messages[1].body)).toBeInTheDocument()
            expect(await screen.findByPlaceholderText(/Type your message/i)).toBeInTheDocument()
            expect(await screen.findByText(initialState.chats[0].companion_name)).toBeInTheDocument()
        })
})