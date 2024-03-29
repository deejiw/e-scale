import axios from 'axios'
import {
  ADD_PARTNER,
  GET_PARTNERS,
  UPDATE_PARTNER,
  DELETE_PARTNER,
  PARTNERS_LOADING
} from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

// dispatch utilizes thunk for asyncronous request
export const getPartners = name => dispatch => {
  dispatch(setPartnersLoading())
  axios
    .get(`./api/partners/${name}`)
    .then(res =>
      dispatch({
        type: GET_PARTNERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const addPartner = (header, payment) => (dispatch, getState) => {
  axios
    .post('/api/partners', { header, payment }, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_PARTNER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const updatePartner = item => (dispatch, getState) => {
  axios
    .patch(`/api/partners/${item.id}`, item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_PARTNER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deletePartner = id => (dispatch, getState) => {
  axios
    .delete(`/api/partners/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_PARTNER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setPartnersLoading = () => {
  return {
    type: PARTNERS_LOADING
  }
}
