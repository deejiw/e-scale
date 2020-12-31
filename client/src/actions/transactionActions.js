import axios from 'axios'
import {
  ADD_ITEM,
  GET_ITEMS,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

// dispatch utilizes thunk for asyncronous request
export const addTransaction = (name, plate) => (dispatch, getState) => {
  axios
    .post('/api/transactions', { name, plate }, tokenConfig(getState))
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

export const getTransactions = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get('./api/transactions')
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

export const updateTransaction = (id, item) => (dispatch, getState) => {
  axios
    .patch(`/api/transactions/${id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        // res.data as designed from ../../routes/api/items (newItem)
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteTransaction = id => (dispatch, getState) => {
  // Delete from MongoDB
  axios
    .delete(`/api/transactions/${id}`, tokenConfig(getState))
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
