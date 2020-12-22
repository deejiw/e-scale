import React, { useState, useEffect } from 'react'
import {
  Button,
  Label,
  Input,
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItem,
  getItems,
  deleteItem,
  updateItem
} from '../actions/transactionActions'
import AddModal from './AddModal'
import PropTypes from 'prop-types'

const ShoppingList = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [weighIn1, setWeighIn1] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const [isAddModal, setIsAddModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)

  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // eslint-disable-next-line
  useEffect(() => dispatch(getItems()), [])
  const onDeleteClick = id => dispatch(deleteItem(id))
  const handleAddModal = () => setIsAddModal(!isAddModal)
  const handleEditModal = () => setIsEditModal(!isEditModal)

  const handleAdd = e => {
    e.preventDefault()
    dispatch(
      addItem({
        name: name,
        weighIn1: weighIn1
      })
    )
    handleAddModal()
  }

  return (
    <div>
      <Container>
        {isAuthenticated ? (
          <div>
            <Button
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={handleAddModal}>
              Add Record
            </Button>

            <Button
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={() => setIsDelete(!isDelete)}>
              {setIsDelete ? 'Edit' : 'Done'}
            </Button>

            <Button color='dark' style={{ marginBottom: '1rem' }} href='./bps'>
              Manage Business Partner
            </Button>

            <AddModal
              show={isAddModal}
              handleAdd={handleAdd}
              setName={setName}
              setWeighIn1={setWeighIn1}
              onClose={handleAddModal}
            />

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
            <h4 className='mb-3 ml-4'>Please login to access the system</h4>
          </div>
        )}
      </Container>
    </div>
  )
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default ShoppingList
