import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute ({ isAuthed, component: Component, ...kwargs}) {
  return (
    <Route {...kwargs} render={(props) => {
      if (isAuthed === false) {
        return <Redirect to={{
          pathname: "/login",
          redirectTo: props.location.pathname + props.location.hash
        }} />
      }
      else {
        return <Component {...props} />
      }
    }} />)
}