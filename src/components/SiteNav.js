import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

export default function SiteNav () {
  const [image, setImage] = useState('')

  const authedUser = useSelector(state => {
    return state.users[state.authedUserId]})

  useEffect(() => {
    if (authedUser !== null) {
      try {
        setImage(require("../" + authedUser.avatarURL))
      }
      catch {}
    }
  }, [authedUser])

  const dispatch = useDispatch()
  const onLogout = (e) => {
    dispatch(setAuthedUser(null))
  }

  return (
    <Navbar className='nav'>
      <Navbar.Collapse>
        <Nav.Link as={NavLink} to='/' exact
          activeClassName='active'>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to='/add' exact
          activeClassName='active'>
          New Question
        </Nav.Link>
        <Nav.Link as={NavLink} to='/leaderboard' exact
          activeClassName='active'>
          Leader Board
        </Nav.Link>
        {(authedUser !== undefined) ? 
          (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Hello, {authedUser.name}
              </Navbar.Text>
              <Navbar.Text>
                <img src={image !== '' ? image : ''} className="avatar" alt="" />
              </Navbar.Text>
              <Nav.Link href="#logout" onClick={onLogout}>
                Logout
              </Nav.Link>
            </Navbar.Collapse>
          ) : ''}
      </Navbar.Collapse>
    </Navbar>
  )
}