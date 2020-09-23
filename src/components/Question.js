import React from 'react'

import profile1 from '../media/001-knight.png'
import Card from 'react-bootstrap/Card'
import { Container, Row, Col } from 'react-bootstrap'
export default function QuestionList({location}) {
  return (
    <div>
      Question List
      {location.hash}
    </div>
  )
}