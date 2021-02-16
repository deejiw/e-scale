import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'

import {
  addTransaction,
  getTransactions,
  updateTransaction,
  checkTransaction,
  deleteTransaction
} from '../actions/transactionActions'

import ActiveList from './ActiveList'
import HistoryList from './HistoryList'
import classnames from 'classnames'

const Home = ({ isAuthenticated, error, clearErrors }) => {
  const items = useSelector(state => state.transaction.items)

  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div className='Home'>
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}>
              Active
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
              }}>
              History
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <ActiveList
              isAuthenticated={isAuthenticated}
              error={error}
              clearErrors={clearErrors}
              items={items}
              addTransaction={addTransaction}
              getTransactions={getTransactions}
              updateTransaction={updateTransaction}
              checkTransaction={checkTransaction}
              deleteTransaction={deleteTransaction}
            />
          </TabPane>
          <TabPane tabId='2'>
            <HistoryList items={items} getTransactions={getTransactions} />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  )
}

export default Home
