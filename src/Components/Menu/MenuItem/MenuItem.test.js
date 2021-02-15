import React from 'react'
import MenuItem from './MenuItem'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('<MenuItem>', () => {
    let onClick = jest.fn()


    it('should render correctly', async() => {
        render(<MenuItem onClick={onClick}>Hello</MenuItem>)
        const label = await screen.findByText(/Hello/i)

        expect(label).toBeInTheDocument()
        expect(label).toBeDefined()
    })

    it('onClick should work', async() => {
        render(<MenuItem onClick={onClick}>Hello</MenuItem>)
        const label = await screen.findByText(/Hello/i)
        userEvent.click(label)

        expect(onClick.mock.calls.length).toEqual(1)
    })
})