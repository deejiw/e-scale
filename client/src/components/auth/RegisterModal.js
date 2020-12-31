// aka container; a  compoenent that is hooked with redux
import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const RegisterModal = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  })

  const error = useSelector(state => state.error)

  const isAuthenticated = useSelector(state => state.isAuthenticated)

  const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value // eslint-disable-next-line
    })
    return ref.current
  }

  const prevError = usePrevious(error)

  useEffect(() => {
    if (error !== prevError) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        setState(prevState => ({ ...prevState, msg: error.msg.msg }))
      } else {
        setState({ msg: null })
      }
    }
    if (state.modal && isAuthenticated) {
      toggle()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, prevError)

  const toggle = () => {
    dispatch(clearErrors())
    setState(prevState => ({ ...prevState, modal: !prevState.modal }))
  }

  const onChange = e =>
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  const onSubmit = e => {
    e.preventDefault()
    const { name, email, password } = state
    const newUser = {
      name,
      email,
      password
    }
    dispatch(register(newUser))
  }

  return (
    <div>
      <NavLink onClick={toggle} href='#'>
        Register
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>ชื่อ-นามสกุล</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                className='mb-3'
                onChange={onChange}
              />
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
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
                ลงทะเบียน
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

export default RegisterModal
