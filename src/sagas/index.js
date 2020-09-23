import usersSaga from '../sagas/usersSaga.js'

export default function* rootSaga() {
  yield [
    usersSaga()
  ]
}