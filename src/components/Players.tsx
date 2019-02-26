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
  ref: {
    [x: string]: {
      id: string
    }
  }
}

const Players: FC<{ date: string }> = ({ date }) => {
  const [players, setPlayers] = useState<Response[]>([])

  const fetchPlayers = () => fetch(`/.netlify/functions/get-all-by-date/${date}`)
    .then(response => response.json())
    .then((res: Response[]) => setPlayers(res))
  useEffect(() => {
    fetchPlayers()
  }, [])
  const updatePreference = (refId: string, available: boolean) =>
    fetch(`/.netlify/functions/update-spot/${refId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        available
      })
    })
      .then(response => response.json())
      .then(() => fetchPlayers())

  const countAvailable = players.filter(player => player.data.available).length
  const currentUser = useCurrentUser() as User
  console.log(players, currentUser)
  return (
    <div>
      <h3>Players ({countAvailable} available)</h3>
      {players.map(({ ref, data: { available, name, email } }) => (
        <div key={ref['@ref'].id} className="box">
          <span className="is-size-3">{available ? '👍' : '👎'}</span>
          <strong>{name}</strong>
          {currentUser && currentUser.email === email && (
            <button className="button is-small is-light" onClick={() => updatePreference(ref['@ref'].id, !available)}>
              Update avalability
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
export default Players
