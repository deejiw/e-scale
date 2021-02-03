import axios from 'axios'
import { GET_PAYERS, PAYERS_LOADING } from './types'
import { returnErrors } from './errorActions'

export const getPayers = () => dispatch => {
  dispatch(setPayersLoading())
  axios
    .get('./api/payers')
    .then(res =>
      dispatch({
        type: GET_PAYERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const setPayersLoading = () => {
  return {
    type: PAYERS_LOADING
  }
}
