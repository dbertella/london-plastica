import { useEffect, useState } from 'react'
import netlifyIdentity, { User } from 'netlify-identity-widget'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  useEffect(() => {
    netlifyIdentity.init()
    setCurrentUser(netlifyIdentity.currentUser())
    netlifyIdentity.on('login', user => setCurrentUser(user))
  }, [])
  return currentUser
}
