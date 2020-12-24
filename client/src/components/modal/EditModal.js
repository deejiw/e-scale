import React from 'react'
import { Container, TextField, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Remove, Add } from '@material-ui/icons'
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

const EditModal = ({
  editForm,
  editInput,
  changeEditInput,
  handleAddField,
  handleRemoveField,
  submitEdit,
  toggle
}) => {
  const classes = useStyles()

  return (
    <div>
      <Modal isOpen={editForm.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit {editForm.name} Record </ModalHeader>
        <ModalBody>
          <Form className={classes.root} onSubmit={submitEdit}>
            <Container>
              {editInput.map((subInput, index) => (
                <div key={index}>
                  <Row>
                    <Col xs='4' sm='5'>
                      <TextField
                        name='material'
                        label='Material'
                        variant='filled'
                        value={subInput.material}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col xs='2' sm='2'>
                      <TextField
                        name='deduction'
                        label='Deduct'
                        variant='filled'
                        value={subInput.deduction}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col xs='3' sm='4'>
                      <TextField
                        name='remarks'
                        label='Remarks'
                        variant='filled'
                        value={subInput.remarks}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col xs='0.5' sm='1' className='pl-2'>
                      <IconButton onClick={() => handleRemoveField(index)}>
                        <Remove />
                      </IconButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextField
                        name='weighIn'
                        label='Weigh In'
                        variant='filled'
                        value={subInput.weighIn}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col>
                      <TextField
                        name='weighOut'
                        label='Weigh Out'
                        variant='filled'
                        value={subInput.weighOut}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col xs='2' sm='2'>
                      <TextField
                        name='price'
                        label='Price'
                        variant='filled'
                        value={subInput.price}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                  </Row>
                </div>
              ))}
              <Row>
                <Col sm='12' md={{ size: 6, offset: 3 }}>
                  <IconButton onClick={() => handleAddField()}>
                    <Add />
                  </IconButton>
                </Col>
              </Row>

              <Button color='dark' style={{ marginTop: '2rem' }} block>
                UPDATE
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditModal
