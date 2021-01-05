import React, { useState } from 'react'
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
  const [helperText, setHelperText] = useState({
    isError: 'false',
    text: ''
  })

  const validateWeighOut = (i, j, weighIn, weighOut) => {
    if (weighOut !== '' && weighOut > weighIn) {
      setHelperText({
        isError: true,
        text: 'Must be lower than weigh in'
      })
    } else {
      setHelperText({
        isError: false,
        text: ''
      })
    }
  }

  const isLastIndex = (record, j) => {
    return Object.keys(record).length - 1 === j
  }

  return (
    <div>
      <Modal
        isOpen={header.isOpen && header.type === EDIT_MODAL}
        toggle={toggle}>
        <ModalHeader toggle={toggle} onChange={changeHeader}>
          Edit {header.name}
          <Button style={{ margin: '0 0 0 1rem' }}>เพิ่มรถ</Button>
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Container>
              {records.map((record, i) => (
                <div key={i}>
                  <Label>{record.plate}</Label>
                  <Button
                    onClick={() => handleAddRecord(i)}
                    style={{ margin: '0 0 0 1rem' }}
                    color='secondary'>
                    เพิ่มรายการ
                  </Button>
                  {record.record.map((_, j) => (
                    <div key={j}>
                      <Row>
                        <Col xs='4' sm='5'>
                          <TextField
                            name='material'
                            type='text'
                            label='Material'
                            variant='filled'
                            id='material'
                            autoFocus='true'
                            required='true'
                            value={_.material}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col xs='2' sm='2'>
                          <TextField
                            name='deduction'
                            type='number'
                            label='Deduct'
                            variant='filled'
                            id='deduction'
                            value={_.deduction}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col xs='3' sm='4'>
                          <TextField
                            name='remarks'
                            type='text'
                            label='Remarks'
                            variant='filled'
                            id='filled'
                            value={_.remarks}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>

                        <Button
                          onClick={() => {
                            if (isLastIndex(record.record, j)) {
                              handleRemoveRecord(i, j)
                            }
                          }}
                          bold='true'
                          color='danger'>
                          &minus;
                        </Button>
                      </Row>
                      <Row>
                        <Col>
                          <TextField
                            name='weighIn'
                            type='number'
                            label='Weigh In'
                            variant='filled'
                            id='weignIn'
                            value={_.weighIn}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col>
                          <TextField
                            name='weighOut'
                            type='number'
                            label='Weigh Out'
                            variant='filled'
                            id='weighOut'
                            value={_.weighOut}
                            defaultValue='0'
                            error={helperText.isError}
                            helperText={helperText.text}
                            onChange={e => {
                              changeRecord(i, j, e)
                              validateWeighOut(i, j, _.weighIn, e.target.value)
                            }}
                          />
                        </Col>
                        <Col xs='2' sm='2'>
                          <TextField
                            name='price'
                            type='number'
                            label='Price'
                            variant='filled'
                            id='price'
                            value={_.price}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
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
