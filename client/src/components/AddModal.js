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
import { addItem } from '../actions/transactionActions'

const AddModal = (open, onClose) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [weighIn1, setWeighIn1] = useState(0)
  const [isAddModal, setIsAddModal] = useState(open)
  const _handleAddModal = () => setIsAddModal(!isAddModal)
  const handleAdd = e => {
    e.preventDefault()
    dispatch(
      addItem({
        name: name,
        weighIn1: weighIn1
      })
    )
    _handleAddModal()
  }
  return (
    <Modal show={isAddModal} toggle={onClose}>
      <ModalHeader toggle={onClose}>Add New Record</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleAdd}>
          <FormGroup>
            <Label for='name'>Business Partner Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Type name and identity here'
              onChange={e => setName(e.target.value)}
            />
            <Label for='weighIn1'>Weigh In (kg)</Label>
            <Input
              type='number'
              name='weighIn1'
              id='weighIn1'
              placeholder='Type weigh in here'
              onChange={e => setWeighIn1(e.target.value)}
            />
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Add Record
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddModal
