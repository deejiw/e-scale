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

const EditModal = ({ isOpen, submitEdit, changeEditForm, toggle }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Record</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitEdit}>
            <FormGroup>
              <Label for='name'>Business Partner Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Type name and identity here'
                onChange={changeEditForm}
              />
              <Label for='weighIn1'>Weigh In (kg)</Label>
              <Input
                type='number'
                name='weighIn1'
                id='weighIn1'
                placeholder='Type weigh in here'
                onChange={changeEditForm}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Record
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditModal
