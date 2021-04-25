import React from 'react'
import AuthForm from './AuthForm'
import {render, screen, waitFor, cleanup} from '@testing-library/react'
import {MemoryRouter, Route} from 'react-router-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('<AuthForm>', () => {
  const initialState = {
    user: {
      name: '',
      email: '',
      password: '',
    },
  }
  beforeEach(() => {
    cleanup()
    initialState.user = {
      name: '',
      email: '',
      password: '',
    }
  })

  afterAll(() => {
    cleanup()
  })

  it('should work correctly in login type', async () => {
    const signIn = jest.fn(values => {
      initialState.user = {
        name: 'Maks',
        email: values.email,
        password: values.password,
      }
    })

    render(
      <MemoryRouter initialEntries={['/companionid']}>
        {' '}
        <Route path="/:id">
          <AuthForm type="login" signIn={signIn} />
        </Route>
      </MemoryRouter>,
    )

    const email = await screen.findByLabelText(/email/i)
    const password = await screen.findByLabelText(/password/i)
    const submit = await screen.findByText(/submit/i)

    expect(email).toBeInTheDocument()
    expect(email.value).toEqual('')
    expect(password).toBeInTheDocument()
    expect(password.value).toEqual('')
    expect(submit).toBeInTheDocument()
    expect(screen.queryAllByTestId(/error/i).length).toBe(0)

    await userEvent.type(email, 'correct@test.com')
    await userEvent.type(password, 'correctpassword')
    userEvent.click(submit)

    await waitFor(() => expect(initialState.user.email).toEqual(''))

    expect(screen.queryAllByTestId(/error/i).length).toBe(0)
    expect(signIn.mock.calls.length).toEqual(1)
    expect(initialState.user).toEqual({
      name: 'Maks',
      email: 'correct@test.com',
      password: 'correctpassword',
    })
  })

  it('should work correctly in register type', async () => {
    const createUser = jest.fn(values => {
      initialState.user = {
        name: values.name,
        email: values.email,
        password: values.password,
      }
    })

    render(
      <MemoryRouter initialEntries={['/companionid']}>
        {' '}
        <Route path="/:id">
          <AuthForm type="register" createUser={createUser} />
        </Route>
      </MemoryRouter>,
    )

    const name = await screen.findByLabelText(/name/i)
    const email = await screen.findByLabelText(/email/i)
    const password = await screen.findByLabelText(/password/i)
    const submit = await screen.findByText(/submit/i)

    expect(name).toBeInTheDocument()
    expect(name.value).toEqual('')
    expect(email).toBeInTheDocument()
    expect(email.value).toEqual('')
    expect(password).toBeInTheDocument()
    expect(password.value).toEqual('')
    expect(submit).toBeInTheDocument()
    expect(screen.queryAllByTestId(/error/i).length).toBe(0)

    await userEvent.type(name, 'Maks')
    await userEvent.type(email, 'correct@test.com')
    await userEvent.type(password, 'correctpassword')
    userEvent.click(submit)

    await waitFor(() => expect(initialState.user.email).toEqual(''))

    expect(screen.queryAllByTestId(/error/i).length).toBe(0)
    expect(createUser.mock.calls.length).toEqual(1)
    expect(initialState.user).toEqual({
      name: 'Maks',
      email: 'correct@test.com',
      password: 'correctpassword',
    })
  })
})
