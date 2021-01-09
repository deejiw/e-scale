import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, Row } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Container, TextField, Grid, MenuItem } from '@material-ui/core'
import { AccountCircle, FormatQuote, Call } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { addPartner, getPartners } from '../../actions/partnerActions'
import MaskedInput from 'react-text-mask'
import { paymentTemplate } from '../MainList'
import { banks } from '../master/banks'
const PartnerSearch = ({ changeHeader }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPartners())
  }, [])

  const [header, setHeader] = useState({
    isOpen: false,
    name: '',
    taxId: '',
    tel1: '',
    tel2: ''
  })

  const partners = useSelector(_ => _.partner.items)

  const [input, setInput] = useState('')
  const [partnerListDefault, setPartnerListDefault] = useState(
    partners.map(_ => _.name)
  )
  const [partnerList, setPartnerList] = useState('')
  const [payment, setPayment] = useState([Object.assign({}, paymentTemplate)])
  const closeModal = () => {
    setHeader({ isOpen: false })
  }

  const updateInput = async input => {
    const filtered = partnerListDefault.filter(country => {
      return country.includes(input)
    })
    setInput(input)
    setPartnerList(filtered)
  }

  const changeNewHeader = e => {
    setHeader({ ...header, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    dispatch(addPartner(header))
  }

  const addPayment = () => {
    setPayment([
      ...payment,
      {
        ...paymentTemplate,
        accountNumber: '   -      - '
      }
    ])
  }

  const changePayment = (i, e) => {
    const _ = [...payment]
    _[i][e.target.name] = e.target.value
    setPayment(_)
  }

  const removePayment = i => {
    const _ = [...payment]
    _.splice(i, 1)
    setPayment(_)
  }

  const maskedAccountNumber = props => {
    const { inputRef, ...other } = props

    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[
          /[1-9]/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/
        ]}
        placeholderChar={'\u2000'}
        showMask
      />
    )
  }

  maskedAccountNumber.propTypes = {
    inputRef: PropTypes.func.isRequired
  }

  const handleChange = name => e => {
    setPayment({ ...payment, [name]: e.target.value })
  }

  return (
    <div>
      <input
        name='name'
        style={{
          margin: '0 0 1rem 0',
          width: '10rem',
          background: 'white',
          border: '1px solid #c4c4c4',
          borderRadius: '4px',
          padding: '0.5rem'
        }}
        id='name'
        value={input}
        list='partners'
        placeholder={'พิมพ์หาชื่อคู่ค้า'}
        onChange={e => {
          changeHeader(e)
          updateInput(e.target.value)

          var options = ''
          for (var i = 0; i < partnerList.length; i++) {
            options += '<option value="' + partnerList[i] + '" />'
          }

          document.getElementById('partners').innerHTML = options
        }}
      />
      <datalist id='partners'></datalist>

      <Button
        style={{ margin: '0 0 0 0.5rem' }}
        color='primary'
        onClick={() => setHeader({ isOpen: true })}>
        เพิ่มคู่ค้าใหม่
      </Button>
      <Modal isOpen={header.isOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>เพิ่มคู่ค้าใหม่</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={1}
              direction='row'
              justify='flex-start'
              alignItems='center'>
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  name='name'
                  id='name'
                  label='ชื่อ-นามสกุล,บริษัืท xxx'
                  margin='dense'
                  autoFocus='true'
                  required='true'
                  value={header.name}
                  onChange={e => changeNewHeader(e)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              direction='row'
              justify='flex-start'
              alignItems='center'>
              <Grid item>
                <FormatQuote />
              </Grid>
              <Grid item>
                <TextField
                  name='taxId'
                  id='taxId'
                  label='เลขประจำตัวผู้เสียภาษี'
                  margin='dense'
                  autoFocus='true'
                  value={header.taxId}
                  onChange={e => changeNewHeader(e)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              direction='row'
              justify='flex-start'
              alignItems='center'>
              <Grid item>
                <Call />
              </Grid>
              <Grid item>
                <TextField
                  name='tel1'
                  id='tel1'
                  label='เบอร์ติดต่อ 1'
                  margin='dense'
                  autoFocus='true'
                  value={header.tel1}
                  onChange={e => changeNewHeader(e)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              direction='row'
              justify='flex-start'
              alignItems='center'>
              <Grid item>
                <Call />
              </Grid>
              <Grid item>
                <TextField
                  name='tel2'
                  id='tel2'
                  label='เบอร์ติดต่อ 2'
                  margin='dense'
                  autoFocus='true'
                  value={header.tel2}
                  onChange={e => changeNewHeader(e)}
                />
              </Grid>
            </Grid>

            <h6>บัญชีการเงิน</h6>
            {payment.map((_, index) => (
              <div key={index}>
                <Grid
                  container
                  spacing={1}
                  direction='row'
                  justify='flex-start'
                  alignItems='center'>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name='type'
                      id='type'
                      label='ประเภท'
                      variant='outlined'
                      fullWidth='true'
                      margin='dense'
                      autoFocus='true'
                      required='true'
                      value={_.type}
                      onChange={e => changePayment(index, e)}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <TextField
                      select
                      name='bank'
                      id='bank'
                      label='ธนาคาร'
                      variant='outlined'
                      fullWidth='true'
                      margin='dense'
                      required='true'
                      value={_.bank}
                      onChange={e => changePayment(index, e)}>
                      {banks.map(option => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={2} sm={2}>
                    <Grid item>
                      <Button
                        onClick={() => removePayment(index)}
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
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  direction='row'
                  justify='flex-start'
                  alignItems='center'>
                  <Grid item xs={6}>
                    <TextField
                      name='accountNumber'
                      id='accountNumber'
                      label='เลขบัญชี'
                      variant='outlined'
                      margin='dense'
                      required='true'
                      InputProps={{
                        inputComponent: maskedAccountNumber,
                        value: _.accountNumber,
                        onChange: handleChange('accountNumber')
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name='accountName'
                      id='accountName'
                      label='ชื่อ'
                      variant='outlined'
                      margin='dense'
                      required='true'
                      value={_.accountName}
                      onChange={e => changePayment(index, e)}
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              style={{ margin: '0.25rem 0 0 0' }}
              onClick={() => addPayment()}
              color='secondary'>
              เพิ่มบัญชีการเงิน
            </Button>
            <Button color='success' style={{ margin: '2rem 0 0 0' }} block>
              บันทึกคู่ค้าใหม่
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default PartnerSearch
