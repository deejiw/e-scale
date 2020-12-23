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
import EditModal from './EditModal'
import PropTypes from 'prop-types'
import BusinessPartner from './BusinessPartner'

const MainList = () => {
  const dispatch = useDispatch()

  const [addForm, setAddForm] = useState({
    name: '',
    weighIn1: 0
  })

  const [editForm, setEditForm] = useState({
    weighIn1: 0,
    weighOut1: 0
  })

  const changeAddForm = e => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value })
  }

  const changeEditForm = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const [isDelete, setIsDelete] = useState(false)
  const [viewAdd, setViewAdd] = useState(false)
  const [viewEdit, setViewEdit] = useState(false)

  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // eslint-disable-next-line
  useEffect(() => dispatch(getItems()), [])
  const onDeleteClick = id => dispatch(deleteItem(id))
  const toggleViewAdd = () => setViewAdd(!viewAdd)
  const toggleViewEdit = () => setViewEdit(!viewEdit)

  const submitAdd = e => {
    e.preventDefault()
    dispatch(addItem(addForm))
    toggleViewAdd()
  }

  const submitEdit = e => {
    e.preventDefault()
    dispatch(updateItem(editForm))
    toggleViewEdit()
  }

  return (
    <div>
      <Container>
        <AddModal
          isOpen={viewAdd}
          submitAdd={submitAdd}
          changeAddForm={changeAddForm}
          toggle={toggleViewAdd}
        />

        <EditModal
          isOpen={viewEdit}
          submitEdit={submitEdit}
          changeEditForm={changeEditForm}
          toggle={toggleViewEdit}
        />

        {isAuthenticated ? (
          <div>
            <BusinessPartner />

            <Button // Add Record
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={toggleViewAdd}>
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
