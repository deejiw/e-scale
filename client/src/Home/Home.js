import React, { useState } from 'react'
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'

import ActiveList from './ActiveList'
import HistoryList from './HistoryList'
import classnames from 'classnames'

const Home = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <div>
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
            <ActiveList />
          </TabPane>
          <TabPane tabId='2'>
            <HistoryList />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  )
}

export default Home
