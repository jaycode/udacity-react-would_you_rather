import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveQuestionAnswer, saveQuestion, getQuestions, getUsers } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { receiveUsers } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_NEW_QUESTION_ID = 'RECEIVE_NEW_QUESTION_ID'
export const DELETE_NEW_QUESTION_ID = 'DELETE_NEW_QUESTION_ID'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function receiveNewQuestionId (newQuestionId) {
  return {
    type: RECEIVE_NEW_QUESTION_ID,
    newQuestionId
  }
}

// Function saved, so now delete the newQuestionId from redux so
// the NewQuestion component can be reused.
export function deleteNewQuestionId (newQuestionId) {
  return {
    type: DELETE_NEW_QUESTION_ID
  }
}

export function handleAnswerQuestion(authedUserId, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser: authedUserId, qid: qid, answer: answer })
      .then(() => {
        return getQuestions()
          .then(({ questions }) => {
            return getUsers()
              .then(({ users }) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
              })
          })
      })
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then((newQuestion) => {
        return getQuestions()
          .then(({ questions }) => {
            dispatch(receiveQuestions(questions))
            dispatch(receiveNewQuestionId(newQuestion.id))
            dispatch(hideLoading())
          })
      })
  }
}
