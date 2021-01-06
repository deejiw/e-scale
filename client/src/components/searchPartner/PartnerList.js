import React from 'react'

const PartnerList = ({ partnerList = [] }) => {
  return (
    <>
      {partnerList.map((data, index) => {
        if (data) {
          return (
            <div key={data}>
              <h6>{data}</h6>
            </div>
          )
        }
        return null
      })}
    </>
  )
}

export default PartnerList
