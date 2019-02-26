import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { User } from 'netlify-identity-widget'
import { useCurrentUser } from './currentUser'
import Book from './Book'

const FlexWrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(43, 37, 35, 0.1), 0 0 0 1px rgba(43, 37, 35, 0.1);
  color: #4a4a4a;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`
const SmallBtn = styled.button`
  font-size: 0.65rem;
  background: none;
  border: 0;
  color: #363636;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`
const MonzoMe = styled.a`
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='311' height='69'%3E%3Cg data-name='Layer 3'%3E%3Cpath fill='%23e34b5f' d='M76 50a4 4 0 0 1-1 2L59 68a1 1 0 0 1-2-1V32l19-19z'/%3E%3Cpath fill='%23e7ce9c' d='M63 0a1 1 0 0 0-2 0L38 24v27l19-19 19-19z'/%3E%3Cpath fill='%231e7889' d='M0 50a4 4 0 0 0 1 2l16 16a1 1 0 0 0 2-1V32L0 13z'/%3E%3Cpath fill='%2397baa6' d='M15 0a1 1 0 0 0-2 0L0 13l19 19 19 19V24z'/%3E%3Cpath fill='%23fff' d='M100 50V15h9v4a10 10 0 0 1 10-5 11 11 0 0 1 9 6c4-4 7-6 11-6 8 0 13 4 13 13v23h-10V31c0-5-1-7-5-7s-6 2-6 7v19h-11V31c0-5-1-7-4-7s-6 2-6 7v19zm64-31a19 19 0 0 1 32 13 18 18 0 0 1-5 13 18 18 0 0 1-14 6 17 17 0 0 1-13-6 18 18 0 0 1-5-13 18 18 0 0 1 5-13zm13 22a9 9 0 0 0 9-9 8 8 0 1 0-17 0 9 9 0 0 0 8 9zm26 9V15h10v4c2-3 5-5 10-5 7 0 12 5 12 13v23h-10V31c0-5-1-7-5-7s-7 2-7 7v19zm76-31a19 19 0 0 1 32 13 18 18 0 0 1-5 13 18 18 0 0 1-13 6 17 17 0 0 1-14-6 18 18 0 0 1-5-13 18 18 0 0 1 5-13zm14 22a9 9 0 0 0 8-9 8 8 0 1 0-17 0 9 9 0 0 0 9 9zm-50 9v-7l14-19h-14v-9h26v8l-13 18h13v9z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px;
  background-position: 0.7rem center;
  background-repeat: no-repeat;
  padding-left: 2rem !important;
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

type Props = { date: string; price: number; monzouser?: string }

const Players: FC<Props> = ({ date, price, monzouser }) => {
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
  const countNotAvailable = players.filter(player => !player.data.available).length
  const currentUser = useCurrentUser() as User
  const pricePerPlayer = price / countAvailable
  const bookedAlready =
    currentUser && players.some((p: Response) => currentUser.email === p.data.email)
  return (
    <div>
      <h3>
        Players ({countAvailable} available, {countNotAvailable} not available)
      </h3>
      {players.map(({ ref, data: { available, name, email } }) => (
        <FlexWrapper key={ref['@ref'].id}>
          <span className="is-size-3">
            <span>{available ? '👍' : '👎'}</span> <strong>{name}</strong>
          </span>
          {currentUser && currentUser.email === email && (
            <SmallBtn
              onClick={() => updatePreference(ref['@ref'].id, !available)}
            >
              Update availability
            </SmallBtn>
          )}
          {available ? (
            <MonzoMe
              className="button"
              target="_blank"
              href={
                monzouser &&
                `https://monzo.me/${monzouser}/${pricePerPlayer}?d=🏀⛹️⛹️⛹️🏀`
              }
            >
              £ {pricePerPlayer.toFixed(2)}
            </MonzoMe>
          ) : (
            <span>💔</span>
          )}
        </FlexWrapper>
      ))}
      {!bookedAlready && <Book date={date} />}
    </div>
  )
}
export default Players
