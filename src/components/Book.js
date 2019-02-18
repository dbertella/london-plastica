import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { isEmpty } from 'lodash'

const headers = { 'Content-Type': 'application/json' }

const Book = ({ date }) => {
  const [currentUser, setCurrentUser] = useState({})
  const imIn = () =>
    fetch('/.netlify/functions/book-a-spot', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        // email: currentUser.email,
        name: currentUser.user_metadata.full_name,
        date,
        availability: true
      })
    })
      .then(response => response.json())
      .then(r => console.log(r))

  const imOut = () =>
    fetch('/.netlify/functions/book-a-spot', {
      method: 'POST',
      headers,
      body: {
        email: currentUser.email,
        name: currentUser.user_metadata.full_name,
        date,
        availability: false
      }
    })
      .then(response => response.json())
      .then(r => console.log(r))

  useEffect(() => {
    netlifyIdentity.init()
    setCurrentUser(netlifyIdentity.currentUser())
  }, [])

  return (
    <div>
      {!isEmpty(currentUser) && (
        <>
          <h3>Book your spot</h3>
          <div className="buttons are-medium">
            <button className="button" onClick={imIn}>
              I'm in
            </button>
            <button className="button" onClick={imOut}>
              Not available
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Book
