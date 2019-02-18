import React, { useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const generateHeaders = () => {
  const headers = { 'Content-Type': 'application/json' }
  if (netlifyIdentity.currentUser()) {
    return netlifyIdentity
      .currentUser()
      .jwt()
      .then(token => {
        return { ...headers, Authorization: `Bearer ${token}` }
      })
  }
  return Promise.resolve(headers)
}

const Players = () => {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    fetch('/.netlify/functions/get-all')
      .then(response => response.json())
      .then(r => setPlayers(r.map(player => player.data)))
  }, [])
  return (
    <div>
      Players
      {players.map(p => (
        <div key={p.name + p.date}>
          {p.name} - {p.date} - {p.available}
        </div>
      ))}
    </div>
  )
}

export default Players
