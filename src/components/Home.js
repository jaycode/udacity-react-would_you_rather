import React, { useState } from 'react'
import { FaReact as Logo } from 'react-icons/fa'
import { Route } from 'react-router-dom'
import profile1 from '../media/001-knight.png'
import Card from 'react-bootstrap/Card'
import { Container, Row, Col } from 'react-bootstrap'
import { ButtonGroup, Button, ToggleButton} from 'react-bootstrap'
import QuestionList from './QuestionList'
import { NavLink } from 'react-router-dom'

export default function Home(props) {
  const buttons = [
    { hash: '#unanswered',
      routes: ['#unanswered', ''],
      text: 'Unanswered Questions',
    },
    { hash: '#answered',
      routes: ['#answered'],
      text: 'Answered Questions'
    },
  ]
  return (
    <Row>
      <Col>
        <Card className="text-center mx-auto" style={{width: '500px'}}>
          <ButtonGroup>
            {buttons.map((button, idx) => (
              <Button
                key={idx}
                as={NavLink}
                to={{
                  pathname: '/questions',
                  hash: button.hash
                }}
                active={true}
                variant={button.routes.includes(props.location.hash)  ? 'secondary' : 'outline-secondary'}
                name="question_buttons" 
                className="button-unanswered">
                {button.text}
              </Button>
            ))}
          </ButtonGroup>
          <Card.Body className="window-content">
            <Route path={['/', '/questions']} exact component={QuestionList} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}