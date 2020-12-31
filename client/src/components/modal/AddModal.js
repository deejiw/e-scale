import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col
} from 'reactstrap'
import { Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ADD_MODAL } from './types'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.75, 0)
    }
  }
}))

const AddModal = ({
  header,
  plate,
  changeHeader,
  changePlate,
  handleSubmit,
  handleAddPlate,
  handleRemovePlate,
  toggle
}) => {
  const classes = useStyles()

  return (
    <Modal isOpen={header.isOpen && header.type === ADD_MODAL} toggle={toggle}>
      <ModalHeader toggle={toggle}>เพิ่มบิลใหม่</ModalHeader>
      <ModalBody>
        <Form className={classes.root} onSubmit={handleSubmit}>
          <Container>
            <Row>
              <TextField
                type='text'
                label='Business Partner'
                variant='filled'
                name='name'
                style={{ margin: ' 0 0 0.25rem 1rem' }}
                id='name'
                onChange={changeHeader}
              />
            </Row>

            {plate.map((subRecord, index) => (
              <div key={index}>
                <Row>
                  <Col xs='5' sm='6'>
                    <TextField
                      name='plate'
                      label='Car Number'
                      variant='filled'
                      id='plate'
                      value={subRecord.plate}
                      onChange={e => changePlate(index, e)}
                    />
                  </Col>
                  <Button
                    onClick={() => handleRemovePlate(index)}
                    style={{ padding: '0 1.5rem 0 1.5rem' }}
                    bold='true'
                    color='danger'>
                    &minus;
                  </Button>
                </Row>
              </div>
            ))}
            <Button onClick={() => handleAddPlate()} color='secondary'>
              เพิ่มรถ
            </Button>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              บันทึกบิลใหม่
            </Button>
          </Container>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddModal
