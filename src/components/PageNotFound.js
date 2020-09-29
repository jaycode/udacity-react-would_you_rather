import React from 'react'

export default function PageNotFound({location}) {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>{location.message}</p>
    </div>
  )
}