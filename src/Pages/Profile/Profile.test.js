import React from 'react'
import Profile from './Profile'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk] 
const mockStore = configureStore(middlewares)

describe('<Profile>',()=> {
    const store = mockStore({user: { name: 'Arthur', status: ''}})

    render(<Provider store={store}><MemoryRouter><Profile/></MemoryRouter></Provider>)

    it('should render correctly', async() => {
        const profileHeader = await screen.findByText(/profile/i)
        const img = await screen.findByAltText(/user/i)

        expect(profileHeader).toBeInTheDocument()
        expect(img).toBeInTheDocument()
    })
})  