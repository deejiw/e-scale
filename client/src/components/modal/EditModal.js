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
  Col,
  Label
} from 'reactstrap'
import { EDIT_MODAL } from './types'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.75, -1)
    }
  }
}))

const EditModal = ({
  header,
  records,
  changeHeader,
  changeRecord,
  handleAddRecord,
  handleRemoveRecord,
  handleSubmit,
  toggle
}) => {
  const classes = useStyles()

  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === EDIT_MODAL}
        toggle={toggle}>
        <ModalHeader toggle={toggle} onChange={changeHeader}>
          Edit {header.name}
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Container>
              {records.map((record, i) => (
                <div key={i}>
                  <Label>{record.plate}</Label>
                  {record.record.map((subRecord, j) => (
                    <div key={j}>
                      <Row>
                        <Col xs='4' sm='5'>
                          <TextField
                            name='material'
                            label='Material'
                            variant='filled'
                            id='material'
                            value={subRecord.material}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col xs='2' sm='2'>
                          <TextField
                            name='deduction'
                            label='Deduct'
                            variant='filled'
                            id='deduction'
                            value={subRecord.deduction}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col xs='3' sm='4'>
                          <TextField
                            name='remarks'
                            label='Remarks'
                            variant='filled'
                            id='filled'
                            value={subRecord.remarks}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>

                        <Button
                          onClick={() => handleRemoveRecord(i, j)}
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
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col>
                          <TextField
                            name='weighOut'
                            label='Weigh Out'
                            variant='filled'
                            id='weighOut'
                            value={subRecord.weighOut}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col xs='2' sm='2'>
                          <TextField
                            name='price'
                            label='Price'
                            variant='filled'
                            id='price'
                            value={subRecord.price}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}

                  <Button
                    onClick={() =>
                      handleAddRecord(i, Object.keys(records).length)
                    }
                    style={{ margin: '0 0.5rem 0 0.5rem' }}
                    color='secondary'>
                    เพิ่มรายการ
                  </Button>
                  <hr />
                </div>
              ))}

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

export default EditModal
