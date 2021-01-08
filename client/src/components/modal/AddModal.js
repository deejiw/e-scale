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
import PartnerSearch from '../search/PartnerSearch'

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
            <h6>คู่ค้า</h6>
            <Row style={{ margin: '0 0 -1rem -1rem' }}>
              <Col>
                <PartnerSearch changeHeader={changeHeader} />
              </Col>
            </Row>
            <hr />
            <h6>รถยนต์</h6>
            {plate.map((car, index) => (
              <div key={index}>
                <Row style={{ margin: '0 0 0.5rem -1rem' }}>
                  <Col xs='8' sm='8'>
                    <TextField
                      name='plate'
                      label='ทะเบียน (XX-XXXX)'
                      variant='outlined'
                      id='plate'
                      margin='dense'
                      autoFocus='true'
                      required='true'
                      value={car.plate}
                      onChange={e => changePlate(index, e)}
                    />
                  </Col>
                  <Col style={{ margin: '0 0 0 -1.25rem' }}>
                    <Button
                      onClick={() => handleRemovePlate(index)}
                      style={
                        ({ margin: '0 0 0 -2rem' },
                        { padding: '0.75rem 1.25rem 0.75rem 1.25rem' })
                      }
                      xs='2'
                      sm='2'
                      bold='true'
                      color='danger'>
                      &minus;
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              style={{ margin: '-0.25rem 0 0 0' }}
              onClick={() => handleAddPlate()}
              color='secondary'>
              เพิ่มรถ
            </Button>
            <Button color='success' style={{ margin: '1.5rem 0 0 0' }} block>
              บันทึกบิลใหม่
            </Button>
          </Container>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddModal
