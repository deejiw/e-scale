import axios from 'axios'
import {
  ADD_ITEM,
  GET_ITEMS,
  UPDATE_ITEM,
  CHECK_ITEM,
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

export const updateTransaction = (header, records) => (dispatch, getState) => {
  axios
    .patch(
      `/api/transactions/${header.id}`,
      { header, records },
      tokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const checkTransaction = (id, transaction) => (dispatch, getState) => {
  axios
    .put(`/api/transactions/${id}`, { transaction }, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: CHECK_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteTransaction = id => (dispatch, getState) => {
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
