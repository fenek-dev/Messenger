import React from 'react'
import ProfileLogs from './ProfileLogs'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<ProfileLogs>', () => {
    const name = 'Maks Treonin'
    const last_seen = 1613669308632  //20:28 Feb 18
    const status = 'Hello, friend'

    render(<ProfileLogs name={name} last_seen={last_seen} status={status} online={true} />)

    it('should render without last seen', async() => {
        const userName = await screen.findByText(name) 
        const userLastSeen = screen.queryByText(/18 Feb 20:28/i)
        const userStatus = await screen.findByText(`Status: ${status}`)
        const userOnline = await screen.findByText(/online/i)

        expect(userName).toBeVisible()
        expect(userName).toBeInTheDocument()
        expect(userLastSeen).not.toBeInTheDocument()
        expect(userStatus).toBeVisible()
        expect(userStatus).toBeInTheDocument()
        expect(userOnline).toBeVisible()
        expect(userOnline).toBeInTheDocument()
    })

    it('should render with last seen and withour status', async() => {
        render(<ProfileLogs name={name} last_seen={last_seen} status={''} online={false} />)
        const userLastSeen = await screen.findByText(/18 Feb 20:28/i)
        const userStatus =  screen.queryByText(status)
        const userOnline = screen.queryByText(/online/i)

        expect(userLastSeen).toBeVisible()
        expect(userLastSeen).toBeInTheDocument()
        expect(userStatus).not.toBeInTheDocument()
        expect(userOnline).not.toBeInTheDocument()
    })
})