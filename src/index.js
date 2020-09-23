import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware, { sagaMiddleware } from './middleware'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import rootSaga from './sagas/index'

const store = createStore(reducer, middleware)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);