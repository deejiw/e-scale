import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import Routes from './Routes'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div className='App'>
        <NavBar />
        <Routes />
      </div>
    </Provider>
  </Router>,
  document.getElementById('root')
)
