import React, { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form
} from 'reactstrap'
import { getPartners } from '../../actions/partnerActions'
import { useSelector, useDispatch } from 'react-redux'

const PartnerSearch = ({ changeHeader }) => {
  const dispatch = useDispatch()
  const [header, setHeader] = useState({
    isOpen: false
  })
  const [input, setInput] = useState('')
  const [partnerListDefault, setPartnerListDefault] = useState()
  const [partnerList, setPartnerList] = useState()

  const closeModal = () => {
    setHeader({ isOpen: false })
  }

  const fetchData = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setPartnerList(data.map(a => a.name))
        setPartnerListDefault(data.map(a => a.name))
      })
  }

  const updateInput = async input => {
    const filtered = partnerListDefault.filter(country => {
      return country.includes(input)
    })
    setInput(input)
    setPartnerList(filtered)
  }

  useEffect(() => {
    dispatch(getPartners())
    fetchData()
  }, [])

  const BarStyling = {
    width: '15rem',
    background: '#F2F1F9',
    border: '#F2F1F9',
    padding: '0.5rem'
  }

  return (
    <div>
      <input
        name='name'
        style={BarStyling}
        id='name'
        value={input}
        list='partners'
        placeholder={'Search Partner'}
        onChange={e => {
          changeHeader(e)
          updateInput(e.target.value)

          var options = ''
          for (var i = 0; i < partnerListDefault.length; i++) {
            options += '<option value="' + partnerListDefault[i] + '" />'
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
          <Form
          // onSubmit={setPartner}
          >
            <Container>
              <Button color='success' style={{ margin: '2rem 0 0 0' }} block>
                บันทึกคู่ค้าใหม่
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default PartnerSearch
