import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup
} from 'reactstrap'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  toggle
}) => {
  const classes = useStyles()

  return (
    <Modal
      isOpen={header.isOpen && header.type === 'ADD_MODAL'}
      toggle={toggle}>
      <ModalHeader toggle={toggle}>เพิ่มบันทึกใหม่</ModalHeader>
      <ModalBody>
        <Form className={classes.root} onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              type='text'
              label='Business Partner'
              variant='filled'
              name='name'
              id='name'
              onChange={changeHeader}
            />
            <br />
            <TextField
              type='text'
              label='Car ID'
              variant='filled'
              name='plate'
              id='plate'
              onChange={changePlate}
            />
            <Button color='dark' style={{ marginTop: '2rem' }} block>
              Add Record
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddModal
