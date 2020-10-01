import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveQuestionAnswer, saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_NEW_QUESTION_ID = 'RECEIVE_NEW_QUESTION_ID'
export const DELETE_NEW_QUESTION_ID = 'DELETE_NEW_QUESTION_ID'
export const RECEIVE_QUESTION_ANSWER = 'RECEIVE_QUESTION_ANSWER'
export const RECEIVE_SAVED_QUESTION = 'RECEIVE_SAVED_QUESTION'

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

export function receiveQuestionAnswer(authedUserId, qid, answer) {
  return {
    type: RECEIVE_QUESTION_ANSWER,
    authedUserId,
    qid,
    answer
  }
}

export function receiveSavedQuestion(newQuestion) {
  return {
    type: RECEIVE_SAVED_QUESTION,
    newQuestion
  }
}

export function handleAnswerQuestion(authedUserId, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer({ authedUser: authedUserId, qid: qid, answer: answer })
      .then(() => {
        dispatch(receiveQuestionAnswer(authedUserId, qid, answer))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .then((newQuestion) => {
        dispatch(receiveSavedQuestion(newQuestion))
        dispatch(receiveNewQuestionId(newQuestion.id))
        dispatch(hideLoading())
      })
  }
}
