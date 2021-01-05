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

  const [totalAmount, setTotalAmount] = useState(0)

  const netWeight = (weighIn, weighOut, deduction) =>
    weighIn - weighOut - deduction

  const amount = (netWeight, price) => {
    const amount = netWeight * price
    return amount
  }

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
                <Col xs='auto' sm='4'>
                  <Row>
                    <h6>สินค้า</h6>
                  </Row>
                  <Row>
                    <h6>หมายเหตุ</h6>
                  </Row>
                </Col>
                <Col xs='auto' sm='2'>
                  <Row>
                    <h6>เข้า</h6>
                  </Row>
                  <Row>
                    <h6>ออก</h6>
                  </Row>
                </Col>
                <Col xs='auto' sm='1'>
                  <Row>
                    <h6>สุทธิ</h6>
                  </Row>
                  <Row>
                    <h6>หัก</h6>
                  </Row>
                </Col>
                <Col xs='auto' sm={{ size: 'auto', offset: 1 }}>
                  <h6>ราคา</h6>
                </Col>
                <Col xs='2' sm='2'>
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
                          <Row style={{ margin: '0 0 0 -1.75rem' }}>
                            <Label>{_.material}</Label>
                          </Row>
                          <Row style={{ margin: '0 0 0 -1.75rem' }}>
                            <Label>{_.remarks}</Label>
                          </Row>
                        </Col>
                        <Col xs='2' sm='2'>
                          <Row>
                            <Label>{_.weighIn}</Label>
                          </Row>
                          <Row>
                            <Label>{_.weighOut}</Label>
                          </Row>
                        </Col>
                        <Col xs='1' sm='1'>
                          <Row>
                            <Label>
                              {netWeight(_.weighIn, _.weighOut, _.deduction)}
                            </Label>
                          </Row>
                          <Row>
                            <Label>{_.deduction}</Label>
                          </Row>
                        </Col>
                        <Col xs='auto' sm={{ size: 'auto', offset: 1 }}>
                          <Label>{_.price}</Label>
                        </Col>
                        <Col xs='1' sm='2' style={{ margin: '0 -2rem 0 0' }}>
                          <Label>
                            {amount(
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

              <Row>ยอดรวมทั้งสิ้น</Row>

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
