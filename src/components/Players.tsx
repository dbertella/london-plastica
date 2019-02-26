import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { User } from 'netlify-identity-widget'
import { useCurrentUser } from './currentUser'
import Book from './Book'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SmallBtn = styled.button`
  border-radius: 2px;
  font-size: 0.75rem;
  background-color: #f5f5f5;
  border-color: transparent;
  color: #363636;
`

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

const Players: FC<{ date: string; price: number }> = ({ date, price }) => {
  const [players, setPlayers] = useState<Response[]>([])

  const fetchPlayers = () =>
    fetch(`/.netlify/functions/get-all-by-date/${date}`)
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
  const pricePerPlayer = price / countAvailable
  const bookedAlready = currentUser && players.some((p: Response) => currentUser.email === p.data.email)
  return (
    <div>
      <h3>Players ({countAvailable} available)</h3>
      {players.map(({ ref, data: { available, name, email } }) => (
        <FlexWrapper key={ref['@ref'].id} className="box">
          <span className="is-size-3">
            {available ? '👍' : '👎'} <strong>{name}</strong>
          </span>
          {available && <span>£ {pricePerPlayer}</span>}
          {currentUser && currentUser.email === email && (
            <SmallBtn
              className="button"
              onClick={() => updatePreference(ref['@ref'].id, !available)}
            >
              Update avalability
            </SmallBtn>
          )}
        </FlexWrapper>
      ))}
      {!bookedAlready && <Book date={date} />}
    </div>
  )
}
export default Players
