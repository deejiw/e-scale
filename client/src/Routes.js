import React, { useEffect } from 'react'
import { Router, Redirect, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'reactstrap'
import { createBrowserHistory as history } from 'history'
import store from './store'
import { clearErrors } from './actions/errorActions'
import { loadUser, login, logout, register } from './actions/authActions'
import Welcome from './00_Welcome/Welcome'
import Home from './10_Home/Home'
import Payer from './20_Payer/Payer'
import Partner from './30_Partner/Partner'
import NavBar from './80_NavBar/NavBar'

const Routes = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const error = useSelector(state => state.error)
  // const partner = useSelector(state => state.partners)

  const HomeRoute = () => <Home user={user} />
  const PayerRoute = () => <Payer />
  const PartnerRoute = () => <Partner />

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
        }
      />
    )
  }

  return (
    <div>
      <Router history={history}>
        <NavBar
          isAuthenticated={isAuthenticated}
          user={user}
          error={error}
          clearErrors={clearErrors}
          login={login}
          logout={logout}
          register={register}
        />
        <Container className='ml-1 mu-1'>
          <Switch>
            <Route
              path='/'
              component={isAuthenticated ? HomeRoute : Welcome}
              exact
            />
            <PrivateRoute path='/payer' component={PayerRoute} exact />
            <PrivateRoute path='/partner' component={PartnerRoute} exact />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default Routes
