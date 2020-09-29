import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FaTrophy as Trophy } from 'react-icons/fa'

export default function LeaderboardItem({rank, id, name, answered, created, score, avatarURL}) {
  const [image, setImage] = useState('')

  useEffect(() => {
    try {
      setImage(require("../" + avatarURL))
    }
    catch(err) {

    }
  }, [avatarURL]);

  return (
    <Card className={`question_card large_card leader rank-${rank}`}>
      <Card.Body>
        <img src={image !== '' ? image : ''} alt="" className="avatar" />
        <div className="question_card-content">
          <h3 className="name">{name}</h3>
          <div className="score_item top">
            <span className="label">Answered questions</span>
            <span className="value">{answered}</span>
          </div>
          <div className="score_item">
            <span className="label">Created questions</span>
            <span className="value">{created}</span>
          </div>
        </div>
        <Card className="score-area">
          <Card.Header>Score</Card.Header>
          <Card.Body>
            <div className="score">
              {score}
            </div>
          </Card.Body>
        </Card>
        <Trophy className="trophy-icon" />
      </Card.Body>
    </Card>
  )
}