export function isQuestionAnswered(question, authedUserId) {
  return (question.optionOne.votes.includes(authedUserId) || 
      question.optionTwo.votes.includes(authedUserId)) 
}

export function formatQuestion(question) {
  const q = JSON.parse(JSON.stringify(question))
  q.totalVotes = q.optionOne.votes.length + q.optionTwo.votes.length
  q.optionOne.isWinner = q.optionOne.votes.length > q.optionTwo.votes.length
  q.optionTwo.isWinner = q.optionOne.votes.length < q.optionTwo.votes.length
  q.optionOne.percent = Math.round(q.optionOne.votes.length / q.totalVotes * 10000) / 100
  q.optionTwo.percent = Math.round(q.optionTwo.votes.length / q.totalVotes * 10000) / 100
  return q
}
