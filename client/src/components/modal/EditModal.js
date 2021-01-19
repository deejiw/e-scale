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
  Col
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
        <ModalHeader toggle={toggle}>
          Edit {header.name}
          <Button style={{ margin: '0 0 0 1rem' }} color='primary'>
            เพิ่มรถ
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={handleSubmit}>
            <Container>
              {records.map((record, i) => (
                <div key={i}>
                  <Row style={{ margin: '0 0 0.5rem -1rem' }}>
                    <h5>{record.plate}</h5>
                    <Button
                      onClick={() => handleAddRecord(i)}
                      style={{ margin: '-0.5rem 0 0 0.5rem' }}
                      color='primary'
                      margin='dense'>
                      เพิ่มรายการ
                    </Button>
                  </Row>

                  {record.record.map((_, j) => (
                    <div key={j}>
                      <Row style={{ margin: '0 -1rem 0 -1rem ' }}>
                        <Col
                          style={{ margin: '0 -0.5rem 0 -1rem' }}
                          xs='4'
                          sm='5'>
                          <TextField
                            name='material'
                            id='material'
                            type='text'
                            label='สินค้า'
                            variant='outlined'
                            autoFocus='true'
                            required='true'
                            size='small'
                            multiline
                            rowsMax={3}
                            value={_.material}
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col style={{ margin: '0 -0.5rem 0 0' }} xs='3' sm='3'>
                          <TextField
                            name='deduction'
                            id='deduction'
                            type='number'
                            label='หัก (kg)'
                            variant='outlined'
                            size='small'
                            value={_.deduction}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col
                          style={{
                            margin: '0 0.5rem 0 1rem',
                            padding: '0 0 0 0'
                          }}
                          xs='3'
                          sm='3'>
                          <TextField
                            name='remarks'
                            id='remarks'
                            type='text'
                            label='อธิบาย'
                            variant='outlined'
                            size='small'
                            multiline
                            rowsMax={4}
                            value={_.remarks}
                            defaultValue=''
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col
                          style={{
                            margin: '0.3rem -1rem 0 -0.5rem',
                            padding: '0 -2rem 0 -2rem'
                          }}>
                          {isLastIndex(record.record, j) ? (
                            <Button
                              onClick={() =>
                                isLastIndex(record.record, j)
                                  ? handleRemoveRecord(i, j)
                                  : null
                              }
                              bold='true'
                              color='danger'>
                              &minus;
                            </Button>
                          ) : null}
                        </Col>
                      </Row>
                      <Row style={{ margin: '0 -1rem 0 -1rem ' }}>
                        <Col style={{ margin: '0 -0.5rem 0 -1rem' }}>
                          <TextField
                            name='weighIn'
                            id='weignIn'
                            type='number'
                            label='ชั่งเข้า (kg)'
                            variant='outlined'
                            size='small'
                            value={_.weighIn}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                        <Col>
                          <TextField
                            name='weighOut'
                            id='weighOut'
                            type='number'
                            label='ชั่งออก (kg)'
                            variant='outlined'
                            size='small'
                            aria-describedby='standard-weight-helper-text'
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
                        <Col
                          style={{ margin: '0 -0.5rem 0 -0.5rem' }}
                          xs='3'
                          sm='3'>
                          <TextField
                            name='price'
                            id='price'
                            type='number'
                            label='ราคา'
                            variant='outlined'
                            size='small'
                            value={_.price}
                            defaultValue='0'
                            onChange={e => changeRecord(i, j, e)}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <hr style={{ margin: '0.25rem 0 1rem 0' }} />
                </div>
              ))}

              <Button color='primary' style={{ margin: ' 0 0 0 0' }} block>
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
