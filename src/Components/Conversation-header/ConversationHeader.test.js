import React from 'react'
import ConversationHeader from './ConversationHeader'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<ConversationHeader>',()=> {

    const name = 'Arthur Moore'
    const photoUrl = 'https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg'

    it('should render correctly', async() => {
        
        render(<ConversationHeader name={name} photoUrl={photoUrl} />)
        const nameElement = await screen.findByText(/Arthur Moore/i)
        const img = await screen.findByAltText(/user/i)

        expect(nameElement).toBeInTheDocument() 
        expect(img.getAttribute('src')).toEqual(photoUrl)

    })

})