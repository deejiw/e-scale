import React, { useState, useEffect, memo } from 'react'
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap'
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
      </Container>
    </div>
  )
}

HistoryList.propTypes = {
  items: PropTypes.object.isRequired
}

export default memo(HistoryList)
