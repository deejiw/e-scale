import React, { useState, useEffect } from 'react'
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItem,
  getItems,
  deleteItem,
  updateItem
} from '../actions/transactionActions'

import AddModal from './modal/AddModal'
import EditModal from './modal/EditModal'
import PropTypes from 'prop-types'
import BusinessPartner from './BusinessPartner'

const MainList = () => {
  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const subRecordTemplate = {
    material: '',
    weighIn: 0,
    weighOut: 0,
    deduction: 0,
    remarks: '',
    price: 0
  }

  const [addForm, setAddForm] = useState({
    isOpen: false,
    name: ''
  })

  const [editForm, setEditForm] = useState({
    isOpen: false,
    id: '',
    name: ''
  })

  const [editInput, setEditInput] = useState([subRecordTemplate])

  const changeAddForm = e =>
    setAddForm({ ...addForm, [e.target.name]: e.target.value })

  const changeEditInput = (ind, e) => {
    const values = [...editInput]
    values[ind][e.target.name] = e.target.value
    setEditInput(values)
  }

  const [isDelete, setIsDelete] = useState(false)

  // eslint-disable-next-line
  useEffect(() => dispatch(getItems()), [])
  const onDeleteClick = id => dispatch(deleteItem(id))

  const openViewAdd = () => setAddForm({ isOpen: true })
  const openViewEdit = item => {
    setEditForm({
      isOpen: true,
      id: item._id,
      name: item.name
    })
    setEditInput(item.records)
  }

  const handleAddField = () => {
    setEditInput([...editInput, subRecordTemplate])
  }
  const handleRemoveField = i => {
    const values = [...editInput]
    values.splice(i, 1)
    setEditInput(values)
  }

  const submitAdd = e => {
    e.preventDefault()
    dispatch(addItem(addForm))
    closeViewAdd()
  }
  const submitEdit = e => {
    e.preventDefault()
    dispatch(updateItem(editForm.id, editInput))
    closeViewEdit()
  }

  const closeViewAdd = () => setAddForm({ isOpen: false })
  const closeViewEdit = () => setEditForm({ isOpen: false })

  return (
    <div>
      <Container>
        <AddModal
          addForm={addForm}
          changeAddForm={changeAddForm}
          submitAdd={submitAdd}
          toggle={closeViewAdd}
        />

        {isAuthenticated ? (
          <div>
            <BusinessPartner />

            <Button // Add Record
              color='dark'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={openViewAdd}>
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
                {items.map(item => (
                  <CSSTransition key={item._id} timeout={500} classNames='fade'>
                    <ListGroupItem>
                      {isDelete ? (
                        <Button
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={() => onDeleteClick(item._id)}>
                          &times;
                        </Button>
                      ) : null}
                      <Button
                        className='mr-2'
                        onClick={() => openViewEdit(item)}>
                        {item.name}
                      </Button>

                      <EditModal
                        editForm={editForm}
                        editInput={editInput}
                        changeEditInput={changeEditInput}
                        handleAddField={handleAddField}
                        handleRemoveField={handleRemoveField}
                        submitEdit={submitEdit}
                        toggle={closeViewEdit}
                      />
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
