import React, { useState, useEffect } from 'react'
import { FaReact as Logo } from 'react-icons/fa'
import Card from 'react-bootstrap/Card'
import { Button} from 'react-bootstrap'
import UserSelector from '../components/UserSelector'
import { Redirect } from 'react-router-dom'
import { handleGetUsers } from '../actions/users'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from '../actions/authedUser'

export default function Login({location}) {
  const redirectTo = location.redirectTo === undefined ? "/" : location.redirectTo
  const authedUserId = useSelector(state => state.authedUserId)
  const [activeId, setActiveId] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleGetUsers())
  }, [dispatch]);

  const onChoose = (e, id) => {
    setActiveId(id)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(handleLogin(activeId))
  }

  if (authedUserId !== null) {
    return <Redirect to={redirectTo} />
  }
  else {
    return (
      <Card className="text-center large_card login">
        <Card.Header>
          <Card.Title>Welcome to the Would You Rather App!</Card.Title>
          <Card.Subtitle>Please sign in to continue</Card.Subtitle>
        </Card.Header>
        <Card.Body className="window-content">
          <Logo className="logo" />
          <p className="sign-in">Sign in</p>
          <div>
            <UserSelector onChoose={onChoose} />
            <br />
            <Button className="submit" type="submit" onClick={onSubmit}>
              Sign In
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
}