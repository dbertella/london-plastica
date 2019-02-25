import React, { FC, useState, useEffect } from 'react'
import { User } from 'netlify-identity-widget'
import { useCurrentUser } from './currentUser'

type Player = {
  available: boolean
  date: string
  email: string
  name: string
}

type Response = {
  data: Player
}

const Players: FC<{ date: string }> = ({ date }) => {
  const [players, setPlayers] = useState<Response[]>([])
  useEffect(() => {
    fetch(`/.netlify/functions/get-all-by-date/${date}`)
      .then(response => response.json())
      .then((res: Response[]) => setPlayers(res))
  }, [])
  const countAvailable = players.filter(player => player.data.available).length
  const currentUser = useCurrentUser() as User
  console.log(players, currentUser)
  return (
    <div>
      <h3>Players ({countAvailable} available)</h3>
      {players.map(({ data: { available, name } }) => (
        <div key={name} className="box">
          <span className="is-size-3">{available ? '👍' : '👎'}</span>
          <strong>{name}</strong>
        </div>
      ))}
    </div>
  )
}
export default Players
