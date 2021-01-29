import React, { useState, useEffect } from 'react'
import AppNavBar from './components/AppNavBar'
import ActiveList from './components/ActiveList'
import HistoryList from './components/HistoryList'
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import classnames from 'classnames'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavBar />
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
    </Provider>
  )
}

export default App
