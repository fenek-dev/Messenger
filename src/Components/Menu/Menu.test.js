import React from 'react'
import Menu from './Menu'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import MenuItem from './MenuItem/MenuItem'

describe('<Menu>', () => {
    const coord = {x:0, y:0}
    let visible = true
    const onClose = jest.fn(() => {visible = false})

    it('should render correctly', async() => {
        render(<Menu coord={coord} onClose={onClose} visible={visible}><MenuItem>Hello</MenuItem></Menu>)

        const label = await screen.findByText(/Hello/i)
        expect(label).toBeVisible()
        expect(label).toBeInTheDocument()
        expect(label).toBeDefined()
    })

    it('should work correctly', async() => {
        render(<Menu coord={coord} onClose={onClose} visible={visible}><MenuItem>Hello</MenuItem></Menu>)

        const label = await screen.findByText(/Hello/i)

        userEvent.click(label)
        expect(onClose.mock.calls.length).toEqual(1)
    })
})