import React from 'react'
import SettingsHeader from './SettingsHeader'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<SettingsHeader>',()=> {
    const title = 'Settings'

    render(<SettingsHeader title={title} />)

    it('should render correctly', async () => {
        const titleElem = await screen.findByText(title)
        expect(titleElem).toBeInTheDocument()
        expect(titleElem).toBeVisible()
    })
})