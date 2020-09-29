import React, { Fragment, useEffect } from 'react'
import { useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import LeaderboardItem from './LeaderboardItem'

export default function Leaderboard() {
  let leaderboard = useSelector(state => {
    let users = state.users
    for (const user of Object.values(users)) {
      users[user.id].answered = Object.keys(user.answers).length
      users[user.id].created = user.questions.length
      users[user.id].score = users[user.id].answered + users[user.id].created
    }
    // Sorting here is not ideal since the values are sorted as many
    // times as the render:
    // users = Object.values(users)
    // users.sort((a, b) => b.score - a.score)
    // console.log("After sorting, users:")
    // console.log(users)
    // return users

    // Use the useRef function instead for more expensive function calls like this.
    // Return the users directly here.
    return Object.values(users)
  })

  // With this code, sorting works, but the sort happened several times.
  // leaderboard = leaderboard.sort((a, b) => b.score - a.score)

  // All the code below don't work. The leaderboard did not get sorted in the end.
  // ==============================================================================
  // 
  // useEffect called once, but a warning is shown
  // ---------------------------------
  // useEffect(() => {
  //   leaderboard = leaderboard.sort((a, b) => b.score - a.score)
  //   console.log(leaderboard)
  // // so we add this hack to suppress the warning: 
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [leaderboard])

  // No warning, but useEffect is called twice
  // ---------------------------------
  // useEffect(() => {
  //   leaderboard.sort((a, b) => b.score - a.score)
  // }, [leaderboard])

  // useEffect is still called twice
  // ---------------------------------
  // const fetchLeaderboard = useCallback(() => {
  //   leaderboard.sort((a, b) => b.score - a.score)
  //   console.log("leaderboard:")
  //   console.log(leaderboard)
  // }, [leaderboard])

  // useEffect(() => {
  //   fetchLeaderboard()
  // }, [fetchLeaderboard])
  //
  // ==============================================================================

  // This code works, the leaderboard got sorted before rendering
  //
  // With useRef, useEffect is still called once, and there is still a warning
  // ---------------------------------  
  const latestLeaderboard = useRef(leaderboard)
  useEffect(() => {
    latestLeaderboard.current = leaderboard
    latestLeaderboard.current.sort((a, b) => b.score - a.score)
    // console.log("After sorting, users:")
    // console.log(latestLeaderboard.current)
  // so we add this hack to suppress the warning: 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // In the end, I decided to sort in the useSelector callback.
  // The takeaway from this experiment is:
  // FOR EXPENSIVE ROUTINES, DO IT THROUGH useEffect() WITH useRef()

  return (
    <Fragment>
      {latestLeaderboard.current.map((leader, i) => (
        <LeaderboardItem
          rank={i+1}
          key={leader.id}
          id={leader.id}
          name={leader.name}
          answered={leader.answered}
          created={leader.created}
          score={leader.score}
          avatarURL={leader.avatarURL}
        />
      ))}
    </Fragment>
  )
}