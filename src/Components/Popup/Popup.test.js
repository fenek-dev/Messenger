import React from 'react'
import Popup from './Popup'
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<Popup>',()=> {
    const props = {
        title: 'Popup',
        width: '100px',
        height: '100px',
        text: 'Just a popup',
        onClose: jest.fn(),
    }

    beforeEach(()=> {
        render(<Popup {...props}><p>Hello</p></Popup>)
    })
    

    it('should render correctly',async () => {
        const title = await screen.findByText(props.title)
        const text = await screen.findByText(props.text)
        const wrapper = await screen.findByTestId(/wrapper/i)
        expect(title).toBeInTheDocument()
        expect(title).toBeVisible()
        expect(text).toBeInTheDocument()
        expect(text).toBeVisible()
        expect(wrapper.style['width']).toEqual(props.width)
        expect(wrapper.style['height']).toEqual(props.height)

        const children = await screen.findByText(/Hello/i)
        expect(children).toBeInTheDocument()
        expect(children).toBeVisible()
    })

    it('should call onClose function', async () => {
        const close = await screen.findByRole(/button/i)
        fireEvent.click(close)
        expect(props.onClose.mock.calls.length).toEqual(1)
    })

})