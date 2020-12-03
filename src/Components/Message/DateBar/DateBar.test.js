import React from 'react'
import DateBar from './DateBar'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<DateBar>',()=> {
    const date = '12:20'

    render(<DateBar date={date} />)

    it('should render correctly', async () => {
        const dateBar = await screen.findByText(date)
        expect(dateBar).toBeInTheDocument()
        expect(dateBar).toBeVisible()
    })

})