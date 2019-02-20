import React, { useState, useEffect } from 'react'

const Players = ({ date }) => {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    fetch(`/.netlify/functions/get-all-by-date/${date}`)
      .then(response => response.json())
      .then(res => setPlayers(Array.isArray(res) ? res.map(r => r.data) : []))
  }, [])

  const countAvailable = players.filter(player => player.available).length
  console.log(players)
  return (
    <div>
      <h3>Players ({countAvailable} available)</h3>
      {players.map(({ available, name }) => (
        <div key={name} className="box">
          <span className="is-size-3">{available ? '👍' : '👎'}</span>
          <strong>{name}</strong>
        </div>
      ))}
    </div>
  )
}

export default Players
