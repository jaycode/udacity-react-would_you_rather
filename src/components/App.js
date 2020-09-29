import React, { Fragment } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import SiteNav from './SiteNav'
import Login from './Login'
import Home from './Home'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
import QuestionPoll from './QuestionPoll'
import NewQuestion from './NewQuestion'
import PageNotFound from './PageNotFound'
import Leaderboard from './Leaderboard'

function App(props, store) {
  const authedUserId = useSelector(state => state.authedUserId)
  console.log("authedUserId is " + authedUserId)
  
  return (
    <Fragment>
      <LoadingBar />
      <SiteNav />
      <Container className="main">
        <Row>
          <Col>
            <Switch>
              <ProtectedRoute
                path={['/', '/questions']} exact
                component={Home}
                isAuthed={authedUserId !== null} />
              <ProtectedRoute
                path={'/add'} exact
                component={NewQuestion}
                isAuthed={authedUserId !== null} />
              <ProtectedRoute
                path={'/questions/:id'} exact
                component={QuestionPoll}
                isAuthed={authedUserId !== null} />
              <ProtectedRoute
                path={'/leaderboard'} exact
                component={Leaderboard}
                isAuthed={authedUserId !== null} />
              <Route path="/login" component={withRouter(Login)} />
              <Route
                path={'/404'}
                component={withRouter(PageNotFound)} />
              <Route
                component={withRouter(PageNotFound)} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <div className="text-center">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </Fragment>
  );
}

export default App;
