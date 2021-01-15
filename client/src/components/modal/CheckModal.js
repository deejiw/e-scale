import React, { useState, useEffect } from 'react'
import { Container, TextField, Grid } from '@material-ui/core'
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

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.75, -1)
    }
  }
}))

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
  }, [header.isOpen])

  const activePartner = useSelector(_ => _.partner.items[0])

  const [payment, setPayment] = useState([])

  useEffect(() => setPayment(activePartner ? activePartner.payment : []), [
    activePartner
  ])
  const addPayment = () => {
    setPayment([...payment, paymentTemplate])
  }

  const changePayment = (i, e) => {
    const values = [...payment]
    values[i][e.target.name] = e.target.value
    setPayment(values)
  }
  const removePayment = i => {
    const values = [...payment]
    values.splice(i, 1)
    setPayment(values)
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
              <Grid
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

              {records.map((record, i) => (
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
                            {_.remarks}
                          </Row>
                        </Grid>
                        <Grid item xs='2' sm='2'>
                          <Row>{_.weighIn}</Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            {_.weighOut}
                          </Row>
                        </Grid>
                        <Grid item xs='1' sm='1'>
                          <Row>
                            {netWeight(_.weighIn, _.weighOut, _.deduction)}
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            {_.deduction}
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

              <Grid
                container
                spacing={1}
                direction='row'
                justify='flex-end'
                alignItems='center'>
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

              <Grid
                container
                spacing={2}
                direction='row'
                justify='flex-start'
                alignItems='center'>
                <Grid item>
                  <h5>การชำระเงิน</h5>
                </Grid>
                <Grid item>
                  <Button color='secondary'>เพิ่ม</Button>
                </Grid>
              </Grid>

              {payment.map((_, i) => (
                <div key={i}>
                  <Grid
                    container
                    spacing={0.5}
                    direction='row'
                    justify='space-between'
                    alignItems='flex-start'>
                    <Grid item xs={1.5} sm={1.5}>
                      {_.type}
                    </Grid>
                    <Grid item xs={2.5} sm={2.5}>
                      {_.bank}
                    </Grid>
                    <Grid item xs={4.5} sm={4.5}>
                      {_.accountNumber}
                    </Grid>
                    <Grid item xs={2.5} sm={2.5}>
                      {_.accountName}
                    </Grid>
                  </Grid>
                </div>
              ))}

              <Button color='primary' style={{ marginTop: '2rem' }} block>
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
