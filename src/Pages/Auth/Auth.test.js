import React from 'react'
import Auth from './Auth'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk] 
const mockStore = configureStore(middlewares)

describe('<Auth>',()=> {
    const store = mockStore({})
    const setIsAuth = jest.fn()

    render(<Provider store={store}><MemoryRouter><Auth type='login' setIsAuth={setIsAuth}/></MemoryRouter></Provider>)

    it('should render correctly', async() => {
        const form = await screen.findByLabelText(/email/i)

        expect(form).toBeInTheDocument()
    })
})