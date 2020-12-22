import React, { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, getItems, deleteItem } from '../actions/bpActions'
import PropTypes from 'prop-types'

const ShoppingList = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [weighIn1, setWeighIn1] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const [isRecModal, setIsRecModal] = useState(false)

  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // eslint-disable-next-line
  useEffect(() => dispatch(getItems()), [])
  const onDeleteClick = id => dispatch(deleteItem(id))
  const handleRecModal = () => setIsRecModal(!isRecModal)

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      addItem({
        bp_name: name,
        weigh_in1: weighIn1
      })
    )
    handleRecModal()
  }

  return (
    <div>
      <Container>
        {isAuthenticated ? (
          <div>
            <Button
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={handleRecModal}>
              New Record
            </Button>

            <Button
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={() => setIsDelete(!isDelete)}>
              {setIsDelete ? 'Edit' : 'Done'}
            </Button>

            <ListGroup>
              <TransitionGroup className='shopping-list'>
                {items.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames='fade'>
                    <ListGroupItem>
                      {isDelete ? (
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={() => onDeleteClick(_id)}>
                          &times;
                        </Button>
                      ) : null}
                      <Button className='mr-2'>{name}</Button>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </div>
        ) : (
          <div>
            <h4 className='mb-3 ml-4'>Welcome to e-Scale Record System</h4>
            <br />
            <h4 className='mb-3 ml-4'>Please login to access the record</h4>
          </div>
        )}
      </Container>
      <Modal isOpen={isRecModal} toggle={handleRecModal}>
        <ModalHeader toggle={handleRecModal}>Add New Record</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='bp_name'>Business Partner Name</Label>
              <Input
                type='text'
                name='bp_name'
                id='bp_name'
                placeholder='Type name and identity here'
                onChange={e => setName(e.target.value)}
              />
              <Label for='weigh_in1'>Business Partner Name</Label>
              <Input
                type='number'
                name='weigh_in1'
                id='weigh_in1'
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
    </div>
  )
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default ShoppingList
