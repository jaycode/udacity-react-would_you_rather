import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

export default function NewQuestion(props) {
  const {authedUserId, newQuestionId} = useSelector(
    state => ({
      authedUserId: state.authedUserId,
      newQuestionId: state.newQuestionId
    }))
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    if (optionOne === '' || optionTwo === '') {
      alert("Please fill both options")
    }
    else {
      const question =  {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUserId
      }
      dispatch(handleSaveQuestion(question))
    }
  }

  const onChange1 = (e) => {
    setOptionOne(e.target.value)
  }

  const onChange2 = (e) => {
    setOptionTwo(e.target.value)
  }

  if (newQuestionId !== null) {
    // Redirect to new question poll (as I think the app should do)
    // return <Redirect to={`/questions/${newQuestionId}`} />
    // Redirect to home (as required by the specifications)
    return <Redirect to={'/'} />

  }

  return (
    <Card className="large_card new_question">
      <Card.Header as="h5">
        Create New Question
      </Card.Header>
      <Card.Body>
        <p className="text1">Complete the question</p>
        <p className="text2">Would you rather ...</p>

        <Form>
          <Form.Control
            type="text"
            placeholder="Enter Option One text here"
            onChange={onChange1}
            className="option-one"
          />
          <p className="or"><span>OR</span></p>
          <Form.Control
            type="text"
            placeholder="Enter Option Two text here"
            onChange={onChange2}
            className="option-two"
          />
          <Button
            type="submit"
            className="submit"
            onClick={onSubmit}
          >Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}