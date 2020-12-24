import React, { useEffect } from 'react'
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

const EditModal = ({ editForm, changeEditForm, submitEdit, toggle }) => {
  useEffect(() => {}, [])
  return (
    <div>
      <Modal isOpen={editForm.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Edit {editForm.activeItemName} Record{' '}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={submitEdit}>
            <FormGroup>
              <Label for='weighIn1'> Weigh In (kg)</Label>
              <Input
                type='text'
                name='weighIn1'
                id='weighIn1'
                onChange={changeEditForm}
                value={editForm.activeItemWeighIn1}
              />
              <Label for='weighOut1'>Weigh Out (kg)</Label>
              <Input
                type='number'
                name='weighOut1'
                id='weighOut1'
                onChange={changeEditForm}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Update Record
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditModal
