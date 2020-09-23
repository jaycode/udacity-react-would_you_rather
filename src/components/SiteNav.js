import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

export default function SiteNav () {
  return (
    <Navbar className='nav'>
      <Navbar.Collapse>
        <Nav.Link as={NavLink} to='/login' exact activeClassName='active'>
          Login
        </Nav.Link>
        <Nav.Link as={NavLink} to='/' exact activeClassName='active'>
          Home
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}