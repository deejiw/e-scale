import React, { Fragment } from 'react'
import { NavLink } from 'reactstrap'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

const Logout = ({ logout }) => {
  const dispatch = useDispatch()
  return (
    <Fragment>
      <NavLink onClick={() => dispatch(logout())} href='#'>
        ออกจากระบบ
      </NavLink>
    </Fragment>
  )
}
Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default Logout
