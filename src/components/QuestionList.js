import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Question from './Question'

export default function QuestionList({location}) {
  const questionIds = useSelector(state => Object.keys(state.questions)
    .sort((a, b) => state.questions[b].timestamp - state.questions[a].timestamp))
  return (
    <Fragment>
      {questionIds.map(id => 
        <Question
          key={id}
          id={id}
          isAnswered={location.hash === '#answered'}
        />
      )}
    </Fragment>
  )
}