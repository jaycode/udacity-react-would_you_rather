import React from 'react'
import { Route } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { ButtonGroup, Button } from 'react-bootstrap'
import QuestionList from './QuestionList'
import { NavLink } from 'react-router-dom'

export default function Home(props) {
  const buttons = [
    { hash: '#unanswered',
      routes: ['#unanswered', ''],
      text: 'Unanswered Questions',
      className: 'button-unanswered'
    },
    { hash: '#answered',
      routes: ['#answered'],
      text: 'Answered Questions',
      className: 'button-answered'
    },
  ]

  return (
    <Card className="text-center large_card">
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
            className={button.className}>
            {button.text}
          </Button>
        ))}
      </ButtonGroup>
      <Card.Body className="window-content">
        <Route path={['/', '/questions']} exact component={QuestionList} />
      </Card.Body>
    </Card>
  )
}