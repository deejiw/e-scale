import React from 'react'
import { Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col
} from 'reactstrap'

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
  changePayment,
  handleAddField,
  handleRemoveField,
  handleSubmit,
  toggle
}) => {
  const classes = useStyles()

  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === 'CHECK_MODAL'}
        toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {header.name} [{header.plate}]
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Container>
              {records.map((subRecord, index) => (
                <div key={index}>
                  <Row>
                    <Col xs='4' sm='5'>
                      <TextField
                        name='material'
                        label='Material'
                        variant='filled'
                        id='material'
                        value={subRecord.material}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>
                    <Col xs='2' sm='2'>
                      <TextField
                        name='deduction'
                        label='Deduct'
                        variant='filled'
                        id='deduction'
                        value={subRecord.deduction}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>
                    <Col xs='3' sm='4'>
                      <TextField
                        name='remarks'
                        label='Remarks'
                        variant='filled'
                        id='filled'
                        value={subRecord.remarks}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>

                    <Button
                      onClick={() => handleRemoveField(index)}
                      bold='true'
                      color='danger'>
                      &minus;
                    </Button>
                  </Row>
                  <Row>
                    <Col>
                      <TextField
                        name='weighIn'
                        label='Weigh In'
                        variant='filled'
                        id='weignIn'
                        value={subRecord.weighIn}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>
                    <Col>
                      <TextField
                        name='weighOut'
                        label='Weigh Out'
                        variant='filled'
                        id='weighOut'
                        value={subRecord.weighOut}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>
                    <Col xs='2' sm='2'>
                      <TextField
                        name='price'
                        label='Price'
                        variant='filled'
                        id='price'
                        value={subRecord.price}
                        onChange={e => changePayment(index, e)}
                      />
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}

              <Button onClick={() => handleAddField()} color='secondary'>
                เพิ่มรายการ
              </Button>

              <Button color='primary' style={{ marginTop: '2rem' }} block>
                บันทึกการแก้ไข
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CheckModal
