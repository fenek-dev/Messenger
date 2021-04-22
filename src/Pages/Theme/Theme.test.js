import React from 'react'
import Theme from './Theme'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<Theme>', () => {
  const store = mockStore({theme: {theme: 'dark'}})

  render(
    <Provider store={store}>
      <Theme />
    </Provider>,
  )

  it('should render correctly', async () => {
    expect(await screen.findByText(/dark theme/i)).toBeInTheDocument()
  })
})
