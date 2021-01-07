import React, { useState, useEffect } from 'react'
import PartnerList from './PartnerList'
import { TextField } from '@material-ui/core'
const SearchPage = props => {
  const [input, setInput] = useState('')
  const [partnerListDefault, setPartnerListDefault] = useState()
  const [partnerList, setPartnerList] = useState()

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
      return country.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input)
    setPartnerList(filtered)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // const list = document.getElementById('partner')

  // partnerListDefault.forEach(item => {
  //   let option = document.createElement('partner')
  //   option.value = item
  //   list.appendChild(option)
  // })

  const BarStyling = {
    width: '20rem',
    background: '#F2F1F9',
    border: '#F2F1F9',
    padding: '0.5rem'
  }

  return (
    <>
      <input
        style={BarStyling}
        key='random1'
        value={input}
        list='partner'
        placeholder={'Search Partner'}
        onChange={e => updateInput(e.target.value)}
      />
      <datalist id='partner'></datalist>

      <PartnerList partnerList={partnerList} />
    </>
  )
}

export default SearchPage
