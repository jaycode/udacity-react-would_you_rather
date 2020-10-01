import { RECEIVE_USERS } from '../actions/users'
import { RECEIVE_QUESTION_ANSWER, RECEIVE_SAVED_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case RECEIVE_QUESTION_ANSWER :
      state[action.authedUserId]['answers'][action.qid] = action.answer
      return state
    case RECEIVE_SAVED_QUESTION :
      state[action.newQuestion.author]['questions'].push(action.newQuestion.id)
      return state
    default :
      return state
  }
}