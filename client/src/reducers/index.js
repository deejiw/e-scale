import { combineReducers } from 'redux'

import errorReducer from './errorReducer'
import authReducer from './authReducer'
import partnerReducer from './partnerReducer'
import transactionReducer from './transactionReducer'
import payerReducer from './payerReducer'
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  partner: partnerReducer,
  transaction: transactionReducer,
  payer: payerReducer
})
