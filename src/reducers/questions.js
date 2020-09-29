import { RECEIVE_QUESTIONS, RECEIVE_NEW_QUESTION_ID, DELETE_NEW_QUESTION_ID } from '../actions/questions'

export function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    default :
      return state
  }
}

export function newQuestionId (state = null, action) {
  switch(action.type) {
    case RECEIVE_NEW_QUESTION_ID :
      return action.newQuestionId
    case DELETE_NEW_QUESTION_ID :
      return null
    default :
      return state
  }
}