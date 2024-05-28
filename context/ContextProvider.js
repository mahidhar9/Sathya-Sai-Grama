import React, { useState } from 'react'
import UserContext from './UserContext'

function ContextProvider({children}) {

   const [userEmail, setUserEmail] = useState()
   const [L1ID, setL1ID] = useState()
  return (
    <UserContext.Provider value={{userName, setUserName,L1ID,setL1ID}}>
      {children}
    </UserContext.Provider>
  )
}

export default ContextProvider