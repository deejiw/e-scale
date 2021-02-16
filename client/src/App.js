import React from 'react'
import store from './store'

import { Provider } from 'react-redux'
import Routes from './Routes'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Routes />
      </div>
    </Provider>
  )
}

export default App
