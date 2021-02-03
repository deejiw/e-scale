import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Home from './Home/Home'
import Payers from './Payer/Payers'
import history from './history'

const Routes = () => {
  const isAuthenticated = useSelector(_ => _.auth.isAuthenticated)

  return (
    <Router history={history}>
      {isAuthenticated ? (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Payer' component={Payers} />
        </Switch>
      ) : (
        <div>
          <br />
          <h4 className='mb-3 ml-4'>Welcome to e-Scale Record System</h4>
          <br />
          <h4 className='mb-3 ml-4'>Please login to access the system</h4>
        </div>
      )}
    </Router>
  )
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default Routes
