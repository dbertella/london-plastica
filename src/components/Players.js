import React, { useState, useEffect } from 'react'
import { pick } from 'lodash'

const Players = ({ date }) => {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    fetch(`/.netlify/functions/get-all-by-date/${date}`)
      .then(response => response.json())
      .then(res => setPlayers(res.map(r => r.data)))
  }, [])

  const countAvailable = players.filter(player => player.available).length
  console.log(players)
  return (
    <div>
      <h3>Players ({countAvailable} available)</h3>
      {players.map(({ available, name }) => (
        <div key={name}>
          {name} - {available ? '👍' : '👎'}
        </div>
      ))}
    </div>
  )
}

export default Players
