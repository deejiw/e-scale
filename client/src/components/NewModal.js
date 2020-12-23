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

const NewModal = ({ isOpen, handleAdd, setName, setWeighIn1, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Record</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleAdd}>
          <FormGroup>
            <Label for='name'>Business Partner Name</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Type name and identity here'
              onChange={e => setName(e.target.value)}
            />
            <Label for='weighIn1'>Weigh In (kg)</Label>
            <Input
              type='number'
              name='weighIn1'
              id='weighIn1'
              placeholder='Type weigh in here'
              onChange={e => setWeighIn1(e.target.value)}
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

export default NewModal