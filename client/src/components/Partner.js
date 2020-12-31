// aka container; a  compoenent that is hooked with redux
import React, { useState, useRef, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

const Partner = () => {
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
      ref.current = value
    })
    return ref.current
  }

  const prevError = usePrevious(error)

  useEffect(() => {
    if (error !== prevError) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        setState(prevState => ({ ...prevState, msg: error.msg.msg }))
      } else {
        setState({ msg: null })
      }
    }
    if (state.modal && isAuthenticated) {
      toggle()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
        คู่ค้า
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>จัดการคู่ค้า</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                className='mb-3'
                onChange={onChange}
              />

              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Search
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

Partner.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

export default Partner
