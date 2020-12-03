import React from 'react'
import ConvInput from './ConvInput'
import { render, screen, fireEvent} from '@testing-library/react'

describe('<ConvInput>', ()=> {
    const message = 'Hello my friend'
    const onSubmit = jest.fn()

    it('should work correctly', async() => {

        render(<ConvInput handleSubmit={onSubmit} />)
        const input = await screen.findByPlaceholderText(/type your message/i)
        const btn = await screen.findByText(/send/i)

        // Check what if we click on button with empty input field
        fireEvent.click(btn)
        expect(input.value).toEqual('')
        expect(onSubmit.mock.calls.length).toEqual(0)

        fireEvent.change(input, { target: { value: message}})
        expect(input.value).toEqual(message)
        expect(onSubmit.mock.calls.length).toEqual(0)

        fireEvent.click(btn)
        expect(input.value).toEqual('')
        expect(onSubmit.mock.calls.length).toEqual(1)
    })
})