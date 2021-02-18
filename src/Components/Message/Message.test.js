import React from 'react'
import Message from './Message'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('<Message>',()=> {
    const props = {
        id: 1613382293548,
        from: 'sjdofjo',
        text:'Hello, my friend',
        date: 1613382293548, //12:44
        photoUrl:'https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
        type:'own',
        onClick: jest.fn()
    }

    const reply = {
        body: 'How are you?',
        created_at: 1613381048330, //12:24 Feb 15 
        from: 'jdlfs23lk3rhk23'
    }


    it('should render correctly', async () => {
        render(<Message {...props} />)
        const text = await screen.findByText(props.text)
        const date = await screen.findByText(/12:44/i)
        expect(text).toBeInTheDocument()
        expect(text).toBeVisible()
        expect(date).toBeInTheDocument()
        expect(date).toBeVisible()

        const img = await screen.findByAltText(/User/i)
        expect(img.getAttribute('src')).toEqual(props.photoUrl)
        expect(img).toBeVisible()

        const wrapper = await screen.findByTestId(/wrapper/i)
        expect(wrapper.classList[1]).toEqual(props.type)

    })

    it('should render reply correctly', async() => {
        render(<Message {...props} reply={reply} />)

        const replyMessage = await screen.findByText(reply.body)
        expect(replyMessage).toBeInTheDocument()
        expect(replyMessage).toBeVisible()

        const replyTime = await screen.findByText(/12:24 Feb 15/i)
        expect(replyTime).toBeInTheDocument()
        expect(replyTime).toBeVisible()
    })

    it('onClick should work', async() => {
        render(<Message {...props} reply={reply} />)

        const text = await screen.findByText(props.text)

        userEvent.click(text)

        expect(props.onClick.mock.calls.length).toEqual(1)
    })
})