import React, { memo } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Container
} from 'reactstrap'

import { DELETE_MODAL } from './types'
import { useDispatch } from 'react-redux'

const DeleteModal = ({ header, toggle, deleteTransaction }) => {
  const dispatch = useDispatch()
  return (
    <Modal
      isOpen={header.isOpen && header.type === DELETE_MODAL}
      toggle={toggle}>
      <ModalHeader toggle={toggle}>ยืนยันการลบ</ModalHeader>
      <ModalBody>
        <Form>
          <Container>
            <Label style={{ margin: '0 0 1rem 0' }}>
              ยันยันที่จะลบบิล {header.name} ?
            </Label>
            <br />
            <Button
              onClick={() => {
                dispatch(deleteTransaction(header.id))
                toggle()
              }}
              style={{ margin: '0 0.5rem 0 0' }}
              color='danger'>
              ยืนยัน
            </Button>
            <Button onClick={toggle} color='primary'>
              ยกเลิก
            </Button>
          </Container>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default memo(DeleteModal)
