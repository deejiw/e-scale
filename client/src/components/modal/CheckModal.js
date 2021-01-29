import React, { useState, useEffect, memo } from 'react'
import {
  Container,
  FormControlLabel,
  TextField,
  MenuItem,
  Grid,
  Radio,
  Checkbox
} from '@material-ui/core'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Label,
  Alert
} from 'reactstrap'
import { CHECK_MODAL } from './types'
import { useSelector, useDispatch } from 'react-redux'
import { getPartners } from '../../actions/partnerActions'
import { checkTransaction } from '../../actions/transactionActions'
import { paymentTemplate } from '../ActiveList'
import { accountTypes } from '../master/accountTypes'
import { banks } from '../master/banks'
import { usePrevious, updateError } from '../auth/customHook'

const initialState = {
  isOpen: false,
  isAccount: false,
  isAccountReadOnly: false,
  isReadOnly: false,
  selected: 0,
  isCash: false,
  cashAmount: 0,
  totalAmount: 0,
  msg: null
}

const CheckModal = ({ header, records, toggle }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPartners(header.name))
    calculateTotal()
    return () => {
      setState(initialState)
      setActivePayment([])
    }
  }, [header.isOpen])

  const error = useSelector(state => state.error)

  const isAuthenticated = useSelector(state => state.isAuthenticated)

  const prevError = usePrevious(error)

  useEffect(() => {
    updateError(
      'SELECT_PAYMENT_FAIL',
      state,
      error,
      prevError,
      isAuthenticated,
      setState,
      toggleModal
    ) // eslint-disable-next-line
  }, [prevError])

  const activePartner = useSelector(_ => _.partner.items[0])

  const [payment, setPayment] = useState([])

  useEffect(() => setPayment(activePartner ? activePartner.payment : []), [
    activePartner
  ])

  const [state, setState] = useState(initialState)

  const [activePayment, setActivePayment] = useState({
    ...paymentTemplate
  })

  const [viewModal, setViewModal] = useState(false)

  const handleAddActivePayment = () => {
    if (!state.isReadOnly && activePayment.length == 0 && !state.isOpen) {
      setState(prev => ({
        ...prev,
        isAccount: true,
        isAccountReadOnly: true,
        isOpen: true
      }))
    } else if (
      !state.isReadOnly &&
      activePayment.length !== 0 &&
      state.isOpen
    ) {
      setState(prev => ({
        ...prev,
        isReadOnly: true
      }))
    } else if (state.isReadOnly && state.isAccountReadOnly) {
      setActivePayment([])
      setState({
        ...state,
        isReadOnly: false,
        isAccountReadOnly: false,
        isOpen: false,
        isAccount: false
      })
    }
  }

  const selectActivePayment = e => {
    e.preventDefault()
    toggleModal()
    setActivePayment(payment[state.selected])
    setState({
      isOpen: true,
      isReadOnly: true,
      isAccountReadOnly: true
    })
  }

  const changeActivePayment = e =>
    setActivePayment({ ...activePayment, [e.target.name]: e.target.value })

  const changeRadio = e => setState({ ...state, selected: e.target.value })

  const toggleCash = () => setState({ ...state, isCash: !state.isCash })

  const subAmount = []

  const netWeight = (weighIn, weighOut, deduction) =>
    weighIn - weighOut - deduction

  const amount = (i, j, netWeight, price) => {
    const _ = netWeight * price
    if (!subAmount[(i, j)]) {
      subAmount[(i, j)] = _
    }
    return _
  }

  const calculateTotal = () => {
    const total = subAmount.reduce((a, b) => a + b, 0)
    setState({ ...state, totalAmount: total })
  }

  const handleTotalAmount = () =>
    setState(prev => ({ ...prev, cashAmount: prev.totalAmount }))

  const formatComma = number => {
    return number
      ? number.toLocaleString(undefined, {
          maximumFractionDigits: 2
        })
      : 0
  }

  const formatAccountNumber = accountNumber => {
    return accountNumber
      ? accountNumber
          .replace(/[^0-9]/g, '')
          .match(/.{1,4}/g)
          ?.join('-')
          .substr(0, 12) || ''
      : null
  }

  const toggleModal = () => {
    setViewModal(!viewModal)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const transaction = {
      status: 'paid',
      name: header.name,
      dateStart: header.dateStart,
      cashAmount: state.cashAmount,
      totalAmount: state.totalAmount,
      payment: [activePayment],
      records: [records]
    }
    dispatch(checkTransaction(header.id, transaction))
    toggle()
  }
  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === CHECK_MODAL}
        toggle={toggle}>
        <ModalHeader toggle={toggle}>สรุปยอด {header.name}</ModalHeader>
        <ModalBody>
          <Form>
            <Container fluid>
              <Grid //Header
                container
                spacing={1}
                direction='row'
                justify='space-between'
                alignItems='center'>
                <Grid item xs='4' sm='4'>
                  <Row>
                    <h6>สินค้า</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>หมายเหตุ</h6>
                  </Row>
                </Grid>
                <Grid item xs='2' sm='2'>
                  <Row>
                    <h6>เข้า</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>(ออก)</h6>
                  </Row>
                </Grid>
                <Grid item xs='1' sm='1'>
                  <Row>
                    <h6>สุทธิ</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>(หัก)</h6>
                  </Row>
                </Grid>
                <Grid item xs='2' sm='2'>
                  <h6>ราคา</h6>
                </Grid>
                <Grid item xs='2.5' sm='2.5'>
                  <h6>จำนวนเงิน</h6>
                </Grid>
              </Grid>

              {records.map((
                record,
                i //Records
              ) => (
                <div key={i}>
                  <Label style={{ margin: '0 0 0.5rem -1.5rem' }}>
                    #{record.plate}
                  </Label>

                  {record.record.map((_, j) => (
                    <div key={j}>
                      <Grid
                        container
                        spacing={1}
                        direction='row'
                        justify='space-between'
                        alignItems='flex-start'>
                        <Grid item xs='4' sm='4'>
                          <Row>{_.material}</Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            ({_.remarks})
                          </Row>
                        </Grid>
                        <Grid item xs='2' sm='2'>
                          <Row>{formatComma(_.weighIn)}</Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            ({formatComma(_.weighOut)})
                          </Row>
                        </Grid>
                        <Grid item xs='1' sm='1'>
                          <Row>
                            {formatComma(
                              netWeight(_.weighIn, _.weighOut, _.deduction)
                            )}
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            ({formatComma(_.deduction)})
                          </Row>
                        </Grid>
                        <Grid item xs='2' sm='2'>
                          {_.price}
                        </Grid>
                        <Grid item xs='2.5' sm='2.5'>
                          <Label>
                            ฿
                            {formatComma(
                              amount(
                                i,
                                j,
                                netWeight(_.weighIn, _.weighOut, _.deduction),
                                _.price
                              )
                            )}
                          </Label>
                        </Grid>
                      </Grid>
                    </div>
                  ))}

                  <hr />
                </div>
              ))}

              <Grid //Total Amount
                container
                spacing={1}
                direction='row'
                justify='flex-end'
                alignItems='center'
                style={{ margin: '-0.75rem 0 -0.75rem 0' }}>
                <Grid item xs={2.5} sm={2.5}>
                  <Label>ยอดรวมทั้งสิ้น</Label>
                </Grid>
                <Grid item xs='auto' sm='auto' md='auto' lg='auto' xl='auto'>
                  <Button onClick={handleTotalAmount}>
                    {`฿ ${formatComma(state.totalAmount)}`}
                  </Button>
                </Grid>
              </Grid>

              <hr />
              <h5>การชำระเงิน</h5>

              <Modal isOpen={viewModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                  เลือกวิธีการจ่ายเงิน
                </ModalHeader>
                <ModalBody>
                  {state.msg ? <Alert color='danger'>{state.msg}</Alert> : null}
                  <Form>
                    <FormGroup>
                      {payment.map((_, index) => (
                        <div key={index}>
                          <Grid
                            container
                            spacing={1}
                            direction='row'
                            justify='flex-start'
                            alignItems='top'>
                            <Grid item xs={1.5} sm={1.5}>
                              <Radio
                                // eslint-disable-next-line
                                checked={state.selected == index}
                                onChange={changeRadio}
                                value={index}
                                name='paymentRadio'
                                color='default'
                                inputProps={{ 'aria-label': 0 }}
                              />
                            </Grid>
                            <Grid item xs={5} sm={5}>
                              <TextField
                                name='type'
                                id='type'
                                label='ประเภท'
                                size='small'
                                value={_.type}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Grid>

                            <Grid item xs={5} sm={5}>
                              <TextField
                                name='bank'
                                id='bank'
                                label='ธนาคาร'
                                size='small'
                                value={_.accountName}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Grid>

                            <Grid item xs={6} sm={6}>
                              <TextField
                                name='accountNumber'
                                id='accountNumber'
                                label='เลขบัญชี'
                                size='small'
                                placeholder='เลขบัญชี (10 หลัก)'
                                value={_.accountNumber}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <TextField
                                name='accountName'
                                id='accountName'
                                label='ชื่อ'
                                size='small'
                                value={_.accountName}
                                InputProps={{
                                  readOnly: true
                                }}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      ))}

                      <Button
                        onClick={selectActivePayment}
                        color='primary'
                        style={{ margin: '1rem 0 0 0' }}
                        block>
                        เลือก
                      </Button>
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>

              <Grid
                container
                spacing={1}
                direction='row'
                justify='flex-start'
                alignItems='center'
                style={{ margin: '-0.5rem 0 0.25rem -0.5rem' }}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={state.isAccountReadOnly}
                        checked={state.isAccount}
                        onChange={() => {
                          if (!state.isAccount) {
                            toggleModal()
                          } else {
                            setState({
                              ...state,
                              isAccount: false,
                              isReadOnly: false
                            })
                            setActivePayment([])
                          }
                        }}
                        name='isAccount'
                        color='primary'
                      />
                    }
                    label='บัญชีธนาคาร'
                  />
                </Grid>

                <Grid item>
                  <Button
                    color={state.isReadOnly ? 'danger' : 'info'}
                    onClick={handleAddActivePayment}>
                    {state.isReadOnly
                      ? 'ล้างค่า'
                      : state.isOpen
                      ? 'บันทึก'
                      : 'เพิ่มใหม่'}
                  </Button>
                </Grid>

                {state.isAccountReadOnly && !state.isReadOnly ? (
                  <Grid item>
                    <Button
                      color='danger'
                      onClick={() =>
                        setState({
                          ...state,
                          isOpen: false,
                          isAccount: false,
                          isAccountReadOnly: false
                        })
                      }>
                      ยกเลิก
                    </Button>
                  </Grid>
                ) : null}
              </Grid>

              {state.isOpen ? (
                <Grid
                  container
                  spacing={0.5}
                  direction='row'
                  justify='space-between'
                  alignItems='center'>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      select
                      name='type'
                      id='type'
                      type='text'
                      label='ประเภท'
                      variant='outlined'
                      fullWidth='true'
                      size='small'
                      required='true'
                      value={activePayment.type}
                      defaultValue='0'
                      InputProps={{
                        readOnly: state.isReadOnly
                      }}
                      onChange={e => changeActivePayment(e)}>
                      {accountTypes.map(option => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5.5}>
                    <TextField
                      select
                      name='bank'
                      id='bank'
                      label='ธนาคาร'
                      variant='outlined'
                      fullWidth='true'
                      size='small'
                      required='true'
                      value={activePayment.bank}
                      InputProps={{
                        readOnly: state.isReadOnly
                      }}
                      onChange={e => changeActivePayment(e)}>
                      {banks.map(option => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    container
                    spacing={24}
                    direction='row'
                    justify='space-between'
                    alignItems='center'>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        name='accountNumber'
                        id='accountNumber'
                        type='text'
                        label='เลชบัญชี'
                        variant='outlined'
                        size='small'
                        value={formatAccountNumber(activePayment.accountNumber)}
                        defaultValue='0'
                        InputProps={{
                          readOnly: state.isReadOnly
                        }}
                        onChange={e => changeActivePayment(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        name='accountName'
                        id='accountName'
                        type='text'
                        label='ชื่อ-สกุล'
                        variant='outlined'
                        size='small'
                        value={activePayment.accountName}
                        defaultValue='0'
                        InputProps={{
                          readOnly: state.isReadOnly
                        }}
                        onChange={e => changeActivePayment(e)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid
                container
                spacing={1}
                direction='row'
                justify='flex-start'
                alignItems='center'>
                <Grid item xs={4} sm={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.isCash}
                        onChange={toggleCash}
                        name='isCash'
                        color='primary'
                      />
                    }
                    label='เงินสด'
                  />
                </Grid>
                {state.isCash ? (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='cashAmount'
                      id='cashAmount'
                      type='number'
                      label='Cash Amount'
                      variant='outlined'
                      size='small'
                      value={state.cashAmount}
                      defaultValue='0'
                      onChange={e =>
                        setState({ ...state, cashAmount: e.target.value })
                      }
                    />
                  </Grid>
                ) : null}
              </Grid>

              <Button
                color='primary'
                style={{ margin: '0 0 0 0' }}
                onClick={handleSubmit}
                block>
                ยืนยันการจ่ายเงิน
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default memo(CheckModal)
