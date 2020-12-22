import React, { useEffect } from 'react'
import AppNavBar from './components/AppNavBar'
import MainList from './components/MainList'

import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavBar />
        <Container>
          <MainList />
        </Container>
      </div>
    </Provider>
  )
}

export default App
