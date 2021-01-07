import { combineReducers } from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import partnerReducer from './partnerReducer'
import transactionReducer from './transactionReducer'
export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  partner: partnerReducer,
  transaction: transactionReducer
})
