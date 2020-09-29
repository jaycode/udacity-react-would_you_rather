import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Card, Button } from 'react-bootstrap'
import { isQuestionAnswered } from '../utils/helpers'
import { NavLink } from 'react-router-dom'

export default function Question({id, optionOne, optionTwo, isAnswered = false}) {
  let {question, author, authedUserId} = useSelector(state => ({
    question: state.questions[id],
    author: state.users[state.questions[id].author],
    authedUserId: state.authedUserId
  }))

  const [image, setImage] = useState('')

  useEffect(() => {
    try {
      setImage(require("../" + author.avatarURL))
    }
    catch(err) {

    }
  }, [author]);

  if (
    (isQuestionAnswered(question, authedUserId) && isAnswered) ||
    ((isQuestionAnswered(question, authedUserId) === false) && isAnswered === false)
  ) {
    return (
      <Card className="question_card">
        <Card.Header>{author.name} asks:</Card.Header>
        <Card.Body>
          <img src={image !== '' ? image : ''} alt="" className="avatar" />
          <div className="question_card-content">
            <p className="question_card-intro">Would you rather...</p>
            <p className="question_card-options">{question.optionOne.text} or {question.optionTwo.text}?</p>
            <Button as={NavLink} to={`/questions/${id}`} variant="outline-success" size="sm" block>View Poll</Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
  else {
    return ''
  }
}