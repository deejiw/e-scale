import React, { useState, useEffect, memo } from 'react'
import {
  Button,
  ButtonGroup,
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'

import { getTransactions } from '../actions/transactionActions'

import { HISTORY_MODAL } from './modal/types'
import PropTypes from 'prop-types'
import HistoryModal from './modal/HistoryModal'
import { carTemplate, recordTemplate, paymentTemplate } from './ActiveList'

// ****************HistoryList*******************
const HistoryList = () => {
  const dispatch = useDispatch()

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(getTransactions())
    setHeader(initialState)
  }, [])

  const items = useSelector(_ => _.transaction.items)
  const isAuthenticated = useSelector(_ => _.auth.isAuthenticated)

  const initialState = {
    isOpen: false,
    type: null,
    item: {
      active: '',
      name: '',
      cashAmount: 0,
      totalAmount: 0,
      records: [{ ...carTemplate, record: [recordTemplate] }],
      payment: [paymentTemplate]
    }
  }
  const [header, setHeader] = useState()

  const openView = (modalType, transaction) => {
    setHeader(prev => ({
      isOpen: true,
      type: modalType,
      item: transaction
    }))
  }

  const closeModal = () => {
    setHeader(initialState)
  }

  return (
    <div>
      <Container>
        {isAuthenticated ? (
          <div style={{ margin: '1rem 0 0 0' }}>
            <ListGroup>
              {items
                .filter(item => item.status.includes('paid'))
                .map(item => (
                  <ListGroupItem>
                    <Button
                      onClick={() => openView(HISTORY_MODAL, item)}
                      color='dark'>
                      {item.name}
                    </Button>
                    <HistoryModal header={header} toggle={closeModal} />
                  </ListGroupItem>
                ))}
            </ListGroup>
          </div>
        ) : (
          <div>
            <br />
            <h4 className='mb-3 ml-4'>Welcome to e-Scale Record System</h4>
            <br />
            <h4 className='mb-3 ml-4'>Please login to access the system</h4>
          </div>
        )}
      </Container>
    </div>
  )
}

HistoryList.propTypes = {
  items: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default memo(HistoryList)
