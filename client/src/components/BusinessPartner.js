import React from 'react'
import { Button } from 'reactstrap'
export default function BusinessPartner() {
  return (
    <div>
      <Button // Manage Business Partner
        color='dark'
        style={{ marginBottom: '1rem' }}
        // onClick={() => history.push('/Products')}
      >
        Manage Business Partner
      </Button>
    </div>
  )
}
