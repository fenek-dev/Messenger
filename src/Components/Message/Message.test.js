import React from 'react'
import Message from './Message'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<Message>',()=> {
    const props = {
        text:'Hello, my friend',
        date: '12:20',
        photoUrl:'https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
        type:'own',
    }

    render(<Message {...props} />)

    it('should render correctly', async () => {
        const text = await screen.findByText(props.text)
        const date = await screen.findByText(props.date)
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
})