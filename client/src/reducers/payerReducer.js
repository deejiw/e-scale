// Where actual state is going, can check action, send payload
import { GET_PAYERS, PAYERS_LOADING } from '../actions/types'
const initialState = {
  items: [],
  loading: false
}

// eslint-disable-next-line react-hooks/exhaustive-deps
const payerReducer = (state = initialState, action) => {
  switch (
    action.type // eslint-disable-line no-unused-vars
  ) {
    case GET_PAYERS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case PAYERS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default payerReducer
