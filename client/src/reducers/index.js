import { combineReducers } from 'redux'

import errorReducer from './errorReducer'
import authReducer from './authReducer'
import partnerReducer from './partnerReducer'
import transactionReducer from './transactionReducer'
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  partner: partnerReducer,
  transaction: transactionReducer
})
