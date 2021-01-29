import React, { memo } from 'react'
import {
  Container,
  FormControlLabel,
  TextField,
  Grid,
  Checkbox
} from '@material-ui/core'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Label
} from 'reactstrap'
import { HISTORY_MODAL } from './types'
const HistoryModal = ({ header, toggle }) => {
  const formatComma = number => {
    return number
      ? number.toLocaleString(undefined, {
          maximumFractionDigits: 2
        })
      : 0
  }

  const netWeight = (weighIn, weighOut, deduction) =>
    weighIn - weighOut - deduction

  const amount = (i, j, netWeight, price) => netWeight * price

  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === HISTORY_MODAL}
        toggle={toggle}>
        <ModalHeader toggle={toggle}>
          รายการสินค้า {header.item.name} ยอด {header.item.totalAmount}
        </ModalHeader>
        <ModalBody>
          <Form>
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

              {header.item.records !== []
                ? header.item.records.map((
                    car,
                    i //Records
                  ) => (
                    <div key={i}>
                      <Label style={{ margin: '0 0 0.5rem -1.5rem' }}>
                        #{car.plate}
                      </Label>

                      {car.record.map((_, j) => (
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
                                    netWeight(
                                      _.weighIn,
                                      _.weighOut,
                                      _.deduction
                                    ),
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
                  ))
                : null}

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
                  <h5>฿ {formatComma(header.item.totalAmount)}</h5>
                </Grid>
              </Grid>
              <hr />
              <h5>การชำระเงิน</h5>

              <FormControlLabel
                control={
                  <Checkbox
                    disabled='true'
                    checked={header.item.payment !== undefined}
                    name='isAccount'
                    color='primary'
                  />
                }
                label='บัญชีธนาคาร'
              />

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
                        disabled='true'
                        checked={header.item.cashAmount !== 0}
                        name='isCash'
                        color='primary'
                      />
                    }
                    label='เงินสด'
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    name='cashAmount'
                    id='cashAmount'
                    type='number'
                    label='Cash Amount'
                    variant='outlined'
                    size='small'
                    value={header.item.cashAmount}
                    defaultValue='0'
                    InputProps={{ readOnly: 'true' }}
                  />
                </Grid>
              </Grid>

              <Button
                color='primary'
                style={{ margin: '0.5rem 0 0 0' }}
                onClick={toggle}
                block>
                ปิด
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default memo(HistoryModal)
