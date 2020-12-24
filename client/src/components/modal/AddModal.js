import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

const AddModal = ({ addForm, changeAddForm, submitAdd, toggle }) => {
  return (
    <Modal isOpen={addForm.isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Record</ModalHeader>
      <ModalBody>
        <Form onSubmit={submitAdd}>
          <FormGroup>
            <Label for='name'>Business Partner Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Type name and identity here'
              onChange={changeAddForm}
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
