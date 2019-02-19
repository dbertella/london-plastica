import { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    netlifyIdentity.init()
    setCurrentUser(netlifyIdentity.currentUser())
  }, [])
  return currentUser
}
