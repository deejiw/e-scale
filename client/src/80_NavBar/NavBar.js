import React, { useState, Fragment, memo } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RegisterModal from './components/RegisterModal'
import LoginModal from './components/LoginModal'
import Logout from './components/Logout'

const NavBar = ({
  isAuthenticated,
  user,
  error,
  clearErrors,
  login,
  logout,
  register
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{user ? `${user.name}` : ''}</strong>
        </span>
      </NavItem>

      <NavItem>
        <Link to='/'>Home</Link>
      </NavItem>

      <NavItem>
        <Link to='/payer'>Payer</Link>
      </NavItem>

      <NavItem>
        <Link to='/partner'>Partner</Link>
      </NavItem>

      <NavItem>
        <Logout logout={logout} />
      </NavItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal
          isAuthenticated={isAuthenticated}
          register={register}
          error={error}
          clearErrors={clearErrors}
        />
      </NavItem>
      <NavItem>
        <LoginModal
          isAuthenticated={isAuthenticated}
          login={login}
          error={error}
          clearErrors={clearErrors}
        />
      </NavItem>
    </Fragment>
  )

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>e-Scale Management Platform</NavbarBrand>
          {/* Handle clicking toggle */}
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            {/* Margin Left Auto */}
            <Nav className='ml-auto' navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default memo(NavBar)
