import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

// dispatch utilizes thunk for asyncronous request
export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios.get('./api/items').then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  )
}

export const addItem = item => dispatch => {
  axios.post('/api/items', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      // res.data as designed from ../../routes/api/items (newItem)
      payload: res.data
    })
  )
}

export const deleteItem = id => dispatch => {
  // Delete from MongoDB
  axios.delete(`/api/items/${id}`).then(res =>
    // Dispatch to reducer
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  )
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
