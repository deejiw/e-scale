import React, { useEffect } from 'react'
import { Router, Redirect, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import history from './history'
import store from './store'

import { loadUser } from './actions/authActions'
import Home from './Home/Home'
import Payers from './Payer/Payers'
import Partners from './Partner/Partners'

const Routes = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const isAuthenticated = useSelector(_ => _.auth.isAuthenticated)

  const NoMatch = () => {
    return (
      <div>
        <h3>No match found</h3>
      </div>
    )
  }

  return (
    <Router history={history}>
      {isAuthenticated ? (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Payer' component={Payers} />
          <Route path='/Partner' component={Partners} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      ) : (
        <div>
          <br />
          <h4 className='mb-3 ml-5'>Welcome to e-Scale Record System</h4>
          <br />
          <h4 className='mb-3 ml-5'>Please login to access the system</h4>
        </div>
      )}
    </Router>
  )
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default Routes
