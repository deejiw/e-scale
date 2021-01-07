import React, { useState, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'

import {
  addTransaction,
  getTransactions,
  updateTransaction
} from '../actions/transactionActions'

import { ADD_MODAL, CHECK_MODAL, EDIT_MODAL, DELETE_MODAL } from './modal/types'
import AddModal from './modal/AddModal'
import EditModal from './modal/EditModal'
import CheckModal from './modal/CheckModal'
import PropTypes from 'prop-types'
import DeleteModal from './modal/DeleteModal'

const MainList = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line
  useEffect(() => dispatch(getTransactions()))
  const items = useSelector(state => state.item.items)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  // ARRAY TEMPLATES
  const carTemplate = {
    plate: ''
  }

  const recordTemplate = {
    material: '',
    weighIn: 0,
    weighOut: 0,
    deduction: 0,
    remarks: '',
    price: 0,
    amount: 0
  }

  const recordsTemplate = {
    carTemplate,
    record: [recordTemplate]
  }
  const paymentTemplate = {
    type: '',
    bank: '',
    accountNumber: '',
    accountName: ''
  }

  const [plate, setPlate] = useState([carTemplate])

  const [header, setHeader] = useState({
    isOpen: false,
    type: '',
    id: '',
    name: '',
    totalAmount: 0
  })

  const [records, setRecords] = useState([recordsTemplate])
  const [payment, setPayment] = useState([paymentTemplate])

  //onChange handlers
  const changeHeader = e =>
    setHeader({ ...header, [e.target.name]: e.target.value })

  const changePlate = (i, e) => {
    const values = [...plate]
    values[i][e.target.name] = e.target.value
    setPlate(values)
  }
  const changeRecord = (i, j, e) => {
    const values = [...records]
    values[i].record[j][e.target.name] = e.target.value
    setRecords(values)
  }

  const changePayment = (i, e) => {
    const values = [...payment]
    values[i][e.target.name] = e.target.value
    setPayment(values)
  }

  const [viewDelete, setViewDelete] = useState({
    isOpen: false,
    buttonText: 'แก้ไข'
  })

  const openViewDelete = (modalType, item) =>
    setHeader({
      isOpen: true,
      type: modalType,
      id: item._id,
      name: item.name
    })

  const openViewAdd = modalType =>
    setHeader({
      isOpen: true,
      type: modalType
    })
  const openViewEdit = (modalType, item) => {
    setHeader({
      isOpen: true,
      type: modalType,
      id: item._id,
      name: item.name
    })

    setRecords(item.records)
  }
  const openViewCheck = (modalType, item) => {
    setHeader({
      isOpen: true,
      type: modalType,
      id: item._id,
      name: item.name
    })
    setRecords(item.records)
  }

  // Handle plate
  const addPlate = () => setPlate([...plate, carTemplate])
  const removePlate = i => {
    const values = [...plate]
    values.splice(i, 1)
    setPlate(values)
  }

  // Handle record
  const addRecord = i => {
    setRecords(prevRecords => {
      const lastIndex = prevRecords[i].record.length - 1
      const prevWeightOut = () => {
        switch (lastIndex) {
          case -1:
            return 0
          default:
            return prevRecords[i].record[lastIndex].weighOut
        }
      }

      return prevRecords.map((car, index) =>
        index === i
          ? {
              ...car,
              record: [
                ...car.record,
                { recordTemplate, weighIn: prevWeightOut() }
              ]
            }
          : car
      )
    })
  }

  const removeRecord = (i, j) => {
    setRecords(prevRecords => {
      prevRecords[i].record.splice(j, 1)
      return prevRecords.map((car, index) =>
        index === i ? { ...car, record: prevRecords[i].record } : car
      )
    })
  }

  const handleAddPayment = () => {
    setPayment([...payment, paymentTemplate])
  }

  const handleRemovePayment = i => {
    const values = [...payment]
    values.splice(i, 1)
    setPayment(values)
  }

  const submitAdd = e => {
    e.preventDefault()
    dispatch(addTransaction(header.name, plate))
    closeModal()
  }
  const submitEdit = e => {
    e.preventDefault()
    dispatch(updateTransaction(header, records))
    closeModal()
  }
  const submitCheck = e => {
    e.preventDefault()
    //dispatch(checkTransaction(header, totalAmount))
    closeModal()
  }

  const closeModal = () => {
    setHeader({ isOpen: false })
  }

  return (
    <div>
      <Container>
        <AddModal
          header={header}
          plate={plate}
          changeHeader={changeHeader}
          changePlate={changePlate}
          handleAddPlate={addPlate}
          handleRemovePlate={removePlate}
          handleSubmit={submitAdd}
          toggle={closeModal}
        />

        {isAuthenticated ? (
          <div>
            <Button // Add Record
              color='success'
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={() => openViewAdd(ADD_MODAL)}>
              บิลใหม่
            </Button>

            <Button // Edit
              color={viewDelete.buttonText === 'แก้ไข' ? 'primary' : 'warning'}
              style={{ marginBottom: '1rem', marginRight: '0.5rem' }}
              onClick={() =>
                setViewDelete({
                  isOpen: !viewDelete.isOpen,
                  buttonText:
                    viewDelete.buttonText === 'แก้ไข' ? 'เสร็จ' : 'แก้ไข'
                })
              }>
              {viewDelete.buttonText}
            </Button>

            <ListGroup>
              <TransitionGroup className='shopping-list'>
                {items.map(item => (
                  <CSSTransition
                    key={item._id}
                    timeout={500}
                    // classNames='fade'
                  >
                    <ListGroupItem>
                      {viewDelete.isOpen ? (
                        <ButtonGroup>
                          <Button
                            className='remove-btn'
                            color='danger'
                            size='sm'
                            onClick={() => openViewDelete(DELETE_MODAL, item)}>
                            &times;
                          </Button>
                          <Button
                            color='warning'
                            size='sm'
                            onClick={() => openViewCheck(CHECK_MODAL, item)}>
                            เช็คออก
                          </Button>
                        </ButtonGroup>
                      ) : null}
                      <Button
                        className='ml-2'
                        onClick={() => openViewEdit(EDIT_MODAL, item)}
                        color='dark'>
                        {item.name}
                      </Button>

                      <EditModal
                        header={header}
                        records={records}
                        changeHeader={changeHeader}
                        changeRecord={changeRecord}
                        handleAddRecord={addRecord}
                        handleRemoveRecord={removeRecord}
                        handleSubmit={submitEdit}
                        toggle={closeModal}
                      />
                      <CheckModal
                        header={header}
                        records={records}
                        payment={payment}
                        changeHeader={changeHeader}
                        changePayment={changePayment}
                        handleAddField={handleAddPayment}
                        handleRemoveField={handleRemovePayment}
                        handleSubmit={submitCheck}
                        toggle={closeModal}
                      />

                      <DeleteModal header={header} toggle={closeModal} />
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
  getTransactions: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  openViewDelete: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default MainList
