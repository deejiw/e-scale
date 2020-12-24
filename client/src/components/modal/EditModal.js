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
      margin: theme.spacing(0.5)
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
              {editInput.map((inputField, index) => (
                <div key={index}>
                  <Row>
                    <Col>
                      <TextField
                        name='material'
                        label='Material'
                        variant='filled'
                        value={inputField.material}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>

                    <Col>
                      <TextField
                        name='remarks'
                        label='Remarks'
                        variant='filled'
                        value={inputField.remarks}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col>
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
                        value={inputField.weighIn}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                    <Col>
                      <TextField
                        name='weighOut'
                        label='Weigh Out'
                        variant='filled'
                        value={inputField.weighOut}
                        onChange={e => changeEditInput(index, e)}
                      />
                    </Col>
                  </Row>
                </div>
              ))}
              <IconButton onClick={() => handleAddField()}>
                <Add />
              </IconButton>
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
