import React from 'react'
import ProfileInputs from './ProfileInputs'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureStore([])

describe('<ProfileInputs>',()=> {
    const initialState = {
        user: {
            name: 'Arthur',
            status: ''
        }
    }
    const store = mockStore(initialState)

    const addUser = jest.fn()
    const updateUser = jest.fn()

    render(<Provider store={store}><ProfileInputs addUser={addUser} updateUser={updateUser} /></Provider>)

    it('should work correctly', async() => {
        const name = await screen.findByLabelText(/name/i)
        const status = await screen.findByLabelText(/status/i)
        const save = await screen.findByText(/save/i)

        expect(addUser.mock.calls.length).toEqual(0)
        expect(updateUser.mock.calls.length).toEqual(0)
        expect(name).toBeInTheDocument()
        expect(name.value).toEqual('Arthur')
        expect(status).toBeInTheDocument()
        expect(status.value).toEqual('')
        expect(save).toBeInTheDocument()

        await userEvent.type(name, 'Maks')
        await userEvent.type(status, 'Hello')
        userEvent.click(save)

        await waitFor(()=> expect(addUser.mock.calls.length).toEqual(0))

        expect(addUser.mock.calls.length).toEqual(1)
        expect(updateUser.mock.calls.length).toEqual(1)
    })

})