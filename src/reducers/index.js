import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authedUser from './authedUser'
import users from './users'
import { questions, newQuestionId } from './questions'

export default combineReducers({
  authedUserId: authedUser,
  users,
  questions,
  newQuestionId: newQuestionId,
  loadingBar: loadingBarReducer,
})