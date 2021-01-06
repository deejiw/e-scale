import React, { useState, useEffect } from 'react'
import { Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  Label
} from 'reactstrap'
import { CHECK_MODAL } from './types'

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
  payment,
  changeHeader,
  changePayment,
  handleAddField,
  shandleRemoveField,
  handleSubmit,
  toggle
}) => {
  const classes = useStyles()

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
          Check {header.name}
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Container fluid>
              <Row>
                <Col xs='4' sm='4'>
                  <Row>
                    <h6>สินค้า</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>หมายเหตุ</h6>
                  </Row>
                </Col>
                <Col xs='2' sm='2'>
                  <Row>
                    <h6>เข้า</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>(ออก)</h6>
                  </Row>
                </Col>
                <Col xs='1' sm='1'>
                  <Row>
                    <h6>สุทธิ</h6>
                  </Row>
                  <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                    <h6>(หัก)</h6>
                  </Row>
                </Col>
                <Col xs='auto' sm={{ size: 'auto', offset: 1 }}>
                  <h6>ราคา</h6>
                </Col>
                <Col xs='1' sm='2' style={{ margin: '0 -2rem 0 0' }}>
                  <h6>จำนวนเงิน</h6>
                </Col>
              </Row>
              {records.map((record, i) => (
                <div key={i}>
                  <Label style={{ margin: '0 0 0.5rem -1.5rem' }}>
                    #{record.plate}
                  </Label>

                  {record.record.map((_, j) => (
                    <div key={j}>
                      <Row>
                        <Col xs='4' sm='4'>
                          <Row>
                            <Label>{_.material}</Label>
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            <Label>{_.remarks}</Label>
                          </Row>
                        </Col>
                        <Col xs='2' sm='2'>
                          <Row>
                            <Label>{_.weighIn}</Label>
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            <Label>({_.weighOut})</Label>
                          </Row>
                        </Col>
                        <Col xs='1' sm='1'>
                          <Row>
                            <Label>
                              {netWeight(_.weighIn, _.weighOut, _.deduction)}
                            </Label>
                          </Row>
                          <Row style={{ margin: '-0.5rem 0 0 -1rem' }}>
                            <Label>({_.deduction})</Label>
                          </Row>
                        </Col>
                        <Col xs='auto' sm={{ size: 'auto', offset: 1 }}>
                          <Label>{_.price}</Label>
                        </Col>
                        <Col xs='1' sm='2' style={{ margin: '0 -2rem 0 0' }}>
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
                        </Col>
                      </Row>
                    </div>
                  ))}

                  <hr />
                </div>
              ))}

              <Row>
                <Col>
                  <Label>ยอดรวมทั้งสิ้น</Label>
                </Col>

                <Col sm='3' md={{ size: 6, offset: 3 }}>
                  <h5>
                    ฿
                    {totalAmount().toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}
                  </h5>
                </Col>
              </Row>

              <Button
                // onClick={() => handleAddRecord(i)}
                style={{ margin: '3rem 0.5rem 0 -0.25rem' }}
                color='secondary'>
                เพิ่มข้อมูลการจ่ายเงิน
              </Button>
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
