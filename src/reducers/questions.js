import { RECEIVE_QUESTIONS,
         RECEIVE_NEW_QUESTION_ID, 
         DELETE_NEW_QUESTION_ID, 
         RECEIVE_QUESTION_ANSWER,
         RECEIVE_SAVED_QUESTION } from '../actions/questions'

export function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case RECEIVE_QUESTION_ANSWER :
      state[action.qid][action.answer]['votes'].push(action.authedUserId)
      return state
    case RECEIVE_SAVED_QUESTION :
      state[action.newQuestion.id] = action.newQuestion
      return state
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