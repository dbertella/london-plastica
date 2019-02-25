import React, { FC } from 'react'
import { isEmpty } from 'lodash'
import { useCurrentUser } from './currentUser'
import { User } from 'netlify-identity-widget'

const headers = { 'Content-Type': 'application/json' }
const Book: FC<{ date: string }> = ({ date }) => {
  const currentUser = useCurrentUser() as User
  const imIn = () =>
    fetch('/.netlify/functions/book-a-spot', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: currentUser.email,
        name: currentUser.user_metadata.full_name,
        date,
        available: true
      })
    })
      .then(response => response.json())
      .then(r => console.log(r))
  const imOut = () =>
    fetch('/.netlify/functions/book-a-spot', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: currentUser.email,
        name: currentUser.user_metadata.full_name,
        date,
        available: false
      })
    })
      .then(response => response.json())
      .then(r => console.log(r))
  return (
    <div>
      {!isEmpty(currentUser) && (
        <>
          <h3>Book your spot</h3>
          <div className="buttons are-medium">
            <button className="button" onClick={imIn}>
              👍 I'm in
            </button>
            <button className="button" onClick={imOut}>
              👎 Not available
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default Book
