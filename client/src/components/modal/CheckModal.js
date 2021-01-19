import React, { useState, useEffect } from 'react'
import {
  Container,
  FormControlLabel,
  TextField,
  MenuItem,
  Grid,
  Radio,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Label
} from 'reactstrap'
import { CHECK_MODAL } from './types'
import { useSelector, useDispatch } from 'react-redux'
import { getPartners } from '../../actions/partnerActions'
import { paymentTemplate } from '../MainList'
import { accountTypes } from '../master/accountTypes'
import { banks } from '../master/banks'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.75, -1)
    }
  }
}))

const initialState = {
  isOpen: false,
  isAccount: false,
  isAccountReadOnly: false,
  isReadOnly: false,
  selected: 0,
  isCash: false
}

const CheckModal = ({
  header,
  records,
  changeHeader,
  handleSubmit,
  toggle
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPartners(header.name))
    setPaymentState(initialState)
    setActivePayment([])
  }, [header.isOpen])

  const activePartner = useSelector(_ => _.partner.items[0])

  const [payment, setPayment] = useState([])

  useEffect(() => setPayment(activePartner ? activePartner.payment : []), [
    activePartner
  ])
  const [paymentState, setPaymentState] = useState(initialState)

  const [cash, setCash] = useState(0)
  const [viewModal, setViewModal] = useState(false)
  const [activePayment, setActivePayment] = useState({
    ...paymentTemplate
  })

  const addPayment = () => {
    setPayment([...payment, paymentTemplate])
  }

  const changePayment = (i, e) => {
    const arr = [...payment]
    arr[i][e.target.name] = e.target.value
    setPayment(arr)
  }

  const changeActivePayment = e =>
    setActivePayment({ ...activePayment, [e.target.name]: e.target.value })

  const changeRadio = e => {
    setPaymentState({ ...paymentState, selected: e.target.value })
  }

  const toggleCash = () => {
    setPaymentState({ ...paymentState, isCash: !paymentState.isCash })
  }
  const removePayment = i => {
    const arr = [...payment]
    arr.splice(i, 1)
    setPayment(arr)
  }
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

  const totalAmount = () => subAmount.reduce((a, b) => a + b, 0)

  const toggleModal = () => {
    setViewModal(!viewModal)
  }
  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === CHECK_MODAL}
        toggle={toggle}>
        <ModalHeader toggle={toggle} onChange={changeHeader}>
          สรุปยอด {header.name}
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
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
                          <Row>{_.weighIn}</Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            ({_.weighOut})
                          </Row>
                        </Grid>
                        <Grid item xs='1' sm='1'>
                          <Row>
                            {netWeight(_.weighIn, _.weighOut, _.deduction)}
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            ({_.deduction})
                          </Row>
                        </Grid>
                        <Grid item xs='2' sm='2'>
                          {_.price}
                        </Grid>
                        <Grid item xs='2.5' sm='2.5'>
                          <Label>
                            ฿
                            {amount(
                              i,
                              j,
                              netWeight(_.weighIn, _.weighOut, _.deduction),
                              _.price
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 2
                            })}
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
                style={{ margin: '-0.5rem 0 -1rem 0' }}>
                <Grid item xs={2.5} sm={2.5}>
                  <Label>ยอดรวมทั้งสิ้น</Label>
                </Grid>
                <Grid item xs={2.5} sm={2.5}>
                  <h5>
                    ฿
                    {totalAmount().toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                  </h5>
                </Grid>
              </Grid>

              <hr />
              <h5>การชำระเงิน</h5>

              <Modal isOpen={viewModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                  เลือกวิธีการจ่ายเงิน
                </ModalHeader>
                <ModalBody>
                  <Form>
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
                              checked={paymentState.selected == index}
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
                      color='primary'
                      style={{ margin: '1rem 0 0 0' }}
                      onClick={() => {
                        toggleModal()
                        setActivePayment(payment[paymentState.selected])
                        setPaymentState({
                          isOpen: true,
                          isReadOnly: true,
                          isAccountReadOnly: true
                        })
                      }}
                      block>
                      เลือก
                    </Button>
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
                        disabled={paymentState.isAccountReadOnly}
                        checked={paymentState.isAccount}
                        onChange={() => {
                          if (!paymentState.isAccount) {
                            toggleModal()
                          } else {
                            setPaymentState({
                              ...paymentState,
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
                    color={paymentState.isReadOnly ? 'danger' : 'info'}
                    onClick={() => {
                      console.log(paymentState)
                      if (
                        !paymentState.isReadOnly &&
                        activePayment.length == 0 &&
                        !paymentState.isOpen
                      ) {
                        setPaymentState({
                          ...paymentState,
                          isAccount: true,
                          isAccountReadOnly: true,
                          isOpen: true
                        })
                      } else if (
                        !paymentState.isReadOnly &&
                        activePayment.length !== 0 &&
                        paymentState.isOpen
                      ) {
                        setPaymentState({
                          ...paymentState,
                          isReadOnly: true
                        })
                      } else if (
                        paymentState.isReadOnly &&
                        paymentState.isAccountReadOnly
                      ) {
                        setActivePayment([])
                        setPaymentState({
                          ...paymentState,
                          isReadOnly: false,
                          isAccountReadOnly: false,
                          isOpen: false,
                          isAccount: false
                        })
                      }
                    }}>
                    {paymentState.isReadOnly
                      ? 'ล้างค่า'
                      : paymentState.isOpen
                      ? 'บันทึก'
                      : 'เพิ่มใหม่'}
                  </Button>
                </Grid>

                {paymentState.isAccountReadOnly && !paymentState.isReadOnly ? (
                  <Grid item>
                    <Button
                      color='danger'
                      onClick={() =>
                        setPaymentState({
                          ...paymentState,
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

              {paymentState.isOpen ? (
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
                        readOnly: paymentState.isReadOnly
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
                        readOnly: paymentState.isReadOnly
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
                        value={activePayment.accountNumber}
                        defaultValue='0'
                        InputProps={{
                          readOnly: paymentState.isReadOnly
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
                          readOnly: paymentState.isReadOnly
                        }}
                        onChange={e => changeActivePayment(e)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid
                container
                spacing={60}
                direction='row'
                justify='flex-start'
                alignItems='center'>
                <Grid item xs={4} sm={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paymentState.isCash}
                        onChange={toggleCash}
                        name='isCash'
                        color='primary'
                      />
                    }
                    label='เงินสด'
                  />
                </Grid>
                {paymentState.isCash ? (
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='cashAmount'
                      id='cashAmount'
                      type='number'
                      label='Cash Amount'
                      variant='outlined'
                      size='small'
                      value={cash}
                      defaultValue='0'
                      onChange={e => setCash(e.target.value)}
                    />
                  </Grid>
                ) : null}
              </Grid>

              <Button color='primary' style={{ margin: '0 0 0 0' }} block>
                ยืนยันการจ่ายเงิน
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CheckModal
