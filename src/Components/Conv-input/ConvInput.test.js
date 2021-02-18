import React from 'react'
import ConvInput from './ConvInput'
import { render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('<ConvInput>', ()=> {
    const message = 'Hello my friend'
    const onSubmit = jest.fn()
    const setReply = jest.fn()
    const reply = {
        body: 'How are you?',
        created_at: 1613381048330, //12:24 Feb 15 
        from: 'jdlfs23lk3rhk23'
    }

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

    it('reply should render correctly', async() => {
        render(<ConvInput handleSubmit={onSubmit} reply={reply} setReply={setReply} />)

        const label = await screen.findByText(reply.body)
        expect(label).toBeInTheDocument()
        expect(label).toBeVisible()

        const date = await screen.findByText(/12:24/i)
        expect(date).toBeInTheDocument()
        expect(date).toBeVisible()
    })

    it('reply should work', async() => {
        render(<ConvInput handleSubmit={onSubmit} reply={reply} setReply={setReply} />)

        const close = await screen.findByTestId('close')

        userEvent.click(close)

        expect(setReply.mock.calls.length).toEqual(1)
    })
})