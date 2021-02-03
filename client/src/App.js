import React, { useEffect } from 'react'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar/NavBar'
import './App.css'
import Routes from './Routes'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className='App'>
        <NavBar />
        <Routes />
      </div>
    </Provider>
  )
}

export default App
