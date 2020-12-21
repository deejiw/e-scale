import React, { useState, Fragment } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen(!isOpen)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  )

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>ShoppingList</NavbarBrand>
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

AppNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
}

export default AppNavBar
