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

import NewModal from './NewModal.js'
import PropTypes from 'prop-types'
import BusinessPartner from './BusinessPartner'

const MainList = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [weighIn1, setWeighIn1] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const [AddModal, setAddModal] = useState(false)
  const [EditModal, setEditModal] = useState(false)

  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // eslint-disable-next-line
  useEffect(() => dispatch(getItems()), [])
  const onDeleteClick = id => dispatch(deleteItem(id))
  const handleAddModal = () => setAddModal(!AddModal)
  const handleEditModal = () => setEditModal(!EditModal)

  const handleAdd = e => {
    e.preventDefault()
    dispatch(
      addItem({
        name: name,
        weighIn: weighIn1
      })
    )
    handleAddModal()
  }

  const handleEdit = e => {
    e.preventDefault()
    dispatch(
      updateItem({
        name: name,
        weighIn: weighIn1
      })
    )
    handleAddModal()
  }

  return (
    <div>
      <Container>
        <NewModal
          isOpen={AddModal}
          handleAdd={handleAdd}
          setName={setName}
          setWeighIn1={setWeighIn1}
          toggle={handleAddModal}
        />

        {isAuthenticated ? (
          <div>
            <BusinessPartner />

            <Button // Add Record
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={handleAddModal}>
              Add Record
            </Button>

            <Button // Edit
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
            <h4 className='mb-3 ml-4'>Please login to access the system</h4>
          </div>
        )}
      </Container>
    </div>
  )
}

MainList.propTypes = {
  getItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default MainList
