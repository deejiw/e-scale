import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

// dispatch utilizes thunk for asyncronous request
export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('./api/bps')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/bps', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        // res.data as designed from ../../routes/api/items (newItem)
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteItem = id => (dispatch, getState) => {
  // Delete from MongoDB
  axios
    .delete(`/api/bps/${id}`, tokenConfig(getState))
    .then(res =>
      // Dispatch to reducer
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
