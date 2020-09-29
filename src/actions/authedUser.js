import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getQuestions } from '../utils/api'
import { receiveQuestions } from './questions'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (authedUserId) {
  return {
    type: SET_AUTHED_USER,
    authedUserId,
  }
}

export function handleLogin (authedUserId) {
  return (dispatch) => {
    dispatch(showLoading())
    return getQuestions()
      .then(({ questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(authedUserId))
        dispatch(hideLoading())
      })
  }
}