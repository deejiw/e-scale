// aka container; a  compoenent that is hooked with redux
import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { usePrevious, updateError } from '../../error/customHook'

const LoginModal = ({ isAuthenticated, login, error, clearErrors }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  })

  const prevError = usePrevious(error)

  useEffect(() => {
    updateError(
      'LOGIN_FAIL',
      state,
      error,
      prevError,
      isAuthenticated,
      setState,
      toggle
    ) // eslint-disable-next-line
  }, [prevError])

  const toggle = () => {
    dispatch(clearErrors())
    setState(prevState => ({ ...prevState, modal: !prevState.modal }))
  }

  const onChange = e =>
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  const onSubmit = e => {
    e.preventDefault()
    const { email, password } = state
    const user = {
      email,
      password
    }
    dispatch(login(user))
  }

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Login
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                autoFocus='true'
                className='mb-3'
                onChange={onChange}
              />
              <Input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='mb-3'
                onChange={onChange}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                เข้าสู่ระบบ
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}
LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

export default LoginModal
