import React, { useState } from 'react'
import UserContext from './UserContext'

function ContextProvider({children}) {

   const [userEmail, setUserEmail] = useState()
   const [L1ID, setL1ID] = useState()
   const [accessToken, setAccessToken] = useState('')
  return (
    <UserContext.Provider value={{userEmail, setUserEmail, L1ID, setL1ID, accessToken, setAccessToken}}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider