// Where actual state is going, can check action, send payload
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
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
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        // Reducer works for MongoDB and thus _id
        items: state.items.filter(item => item._id !== action.payload)
      }
    case ADD_ITEM:
      return {
        // Cannot mutate => copy and append
        ...state,
        items: [action.payload, ...state.items]
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default partnerReducer
