import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Form, Alert, ProgressBar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'
import { isQuestionAnswered, formatQuestion } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
// import { deleteNewQuestionId } from '../actions/questions'

export default function QuestionPoll({location, match}) {
  const {question, author, authedUserId} = useSelector(state => {
    const question_ids = Object.keys(state.questions)
    return ({
      question: ((question_ids.length === 0) || 
                 (question_ids.includes(match.params.id) === false)) ? 
                null : formatQuestion(state.questions[match.params.id]),
      author: ((question_ids.length === 0) || 
               (question_ids.includes(match.params.id) === false)) ? 
              null : state.users[state.questions[match.params.id].author],
      authedUserId: state.authedUserId
    })
  })

  const [image, setImage] = useState('')

  useEffect(() => {
    try {
      if (author != null) {
        setImage(require("../" + author.avatarURL))
      }
    }
    catch(err) {

    }
  }, [author]);


  // To reactivate the new question page
  // No longer needed since we redirect to the homepage
  // useEffect(() => {
  //   dispatch(deleteNewQuestionId())
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const [choice, setChoice] = useState(null)
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    if (choice === null) {
      alert("Please pick an option")
    }
    else {
      dispatch(handleAnswerQuestion(authedUserId, question.id, choice))
    }
  }

  if (question === null) {
    return <Redirect to={{
             pathname: "/404",
             message: `Sorry! Can't find a question with id "${match.params.id}"`
           }} />
  }

  return (
    <Card className="question_card large_card poll">
        <Card.Header>{author.name} asks:</Card.Header>
        <Card.Body>
          <img src={image !== '' ? image : ''} alt="" className="avatar" />
          <div className="question_card-content">
            {(isQuestionAnswered(question, authedUserId)) ? (
              <Fragment>
                <p className="question_card-intro">Results:</p>
                <Alert
                  className="question_card-vote_result"
                  variant={question.optionOne.isWinner ? 'success' : 'secondary'} >
                  <Alert.Heading>
                    Would you rather {question.optionOne.text}?
                  </Alert.Heading>
                  <div className="question_card-stat">
                    <ProgressBar
                      now={question.optionOne.percent}
                      label={`${question.optionOne.percent}%`}
                    />
                    <div className="stat">
                      {`${question.optionOne.votes.length}
                       out of ${question.totalVotes} votes`}
                    </div>
                  </div>
                  {question.optionOne.votes.includes(authedUserId) ?
                    (<div className="question_card-your_vote">Your vote</div>) : ''}
                </Alert> 
                <Alert
                  className="question_card-vote_result"
                  variant={question.optionTwo.isWinner ? 'success' : 'secondary'} >
                  <Alert.Heading>
                    Would you rather {question.optionTwo.text}?
                  </Alert.Heading>
                  <div className="question_card-stat">
                    <ProgressBar
                      now={question.optionTwo.percent}
                      label={`${question.optionTwo.percent}%`}
                    />
                    <div className="stat">
                      {`${question.optionTwo.votes.length}
                       out of ${question.totalVotes} votes`}
                    </div>
                  </div>
                  {question.optionTwo.votes.includes(authedUserId) ?
                    (<div className="question_card-your_vote">Your vote</div>) : ''}
                </Alert>
              </Fragment>
            ) : (
              <Fragment>
                <p className="question_card-intro">Would you rather...</p>
                <div className="question_card-options">
                  <Form.Check 
                    type="radio"
                    id="optionOne"
                    className="option-one"
                    label={question.optionOne.text}
                    name="option"
                    onClick={(e) => setChoice(e.target.id)}
                  />
                  <Form.Check 
                    type="radio"
                    id="optionTwo"
                    className="option-two"
                    label={question.optionTwo.text}
                    name="option"
                    onClick={(e) => setChoice(e.target.id)}
                  />
                </div>
                <Button
                  as={NavLink} to={`/questions/${question.id}`}
                  className="submit"
                  block
                  onClick={onSubmit}>Submit</Button>
              </Fragment>
            )}
          </div>
        </Card.Body>
    </Card>
  )
}