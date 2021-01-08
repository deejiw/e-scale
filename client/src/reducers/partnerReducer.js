// Where actual state is going, can check action, send payload
import {
  GET_PARTNERS,
  ADD_PARTNER,
  DELETE_PARTNER,
  PARTNERS_LOADING
} from '../actions/types'
const initialState = {
  items: [],
  loading: false
}

// eslint-disable-next-line react-hooks/exhaustive-deps
const partnerReducer = (state = initialState, action) => {
  switch (
    action.type // eslint-disable-line no-unused-vars
  ) {
    case GET_PARTNERS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case DELETE_PARTNER:
      return {
        ...state,
        // Reducer works for MongoDB and thus _id
        items: state.items.filter(item => item._id !== action.payload)
      }
    case ADD_PARTNER:
      return {
        // Cannot mutate => copy and append
        ...state,
        items: [action.payload, ...state.items]
      }
    case PARTNERS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default partnerReducer
