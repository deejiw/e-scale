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
export const getPartners = () => dispatch => {
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

export const addPartner = item => (dispatch, getState) => {
  axios
    .post('/api/bps', item, tokenConfig(getState))
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

export const updatePartner = item => (dispatch, getState) => {
  axios
    .patch(`/api/bps/${item.id}`, item, tokenConfig(getState))
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

export const deletePartner = id => (dispatch, getState) => {
  axios
    .delete(`/api/bps/${id}`, tokenConfig(getState))
    .then(res =>
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
