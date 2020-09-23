import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import SiteNav from './SiteNav'
import Login from './Login'
import Home from './Home'
import Container from 'react-bootstrap/Container';

function App(props, store) {
  const loggedIn = false
  return (
    <Router>
      <LoadingBar />
      <SiteNav />
      <Container className="main">
        {loggedIn === false ? <Redirect to="/login" /> : (
          <Route path={['/', '/questions']} exact component={Home} />
        )}
        
        <Route path="/login" component={Login} />
      </Container>
      <div className="text-center">Icons made by <a href="https://www.flaticon.local/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.local/" title="Flaticon">www.flaticon.local</a></div>
    </Router>
  );
}

export default App;
