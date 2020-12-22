import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../actions/itemActions'
import PropTypes from 'prop-types'

const ItemModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const handleToggle = () => setIsOpen(!isOpen)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addItem({ name: name }))
    handleToggle()
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}>
          Add Record
        </Button>
      ) : (
        <h5 className='mb-3 ml-4'>Please login to manage items</h5>
      )}

      <Modal isOpen={isOpen} handleToggle={handleToggle}>
        <ModalHeader handleToggle={handleToggle}>
          Add To Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='item'>Item</Label>
              <Input
                type='text'
                name='name'
                id='item'
                placeholder='Add shopping item'
                onChange={e => setName(e.target.value)}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default ItemModal
