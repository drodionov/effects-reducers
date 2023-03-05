import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {
  },
  onLogout: () => {
  }
})

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedLoggedInUserInformation = localStorage.getItem('isLoggedIn')

    if (storedLoggedInUserInformation === '1') {
      setIsLoggedIn(true)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  const loginHandler = (email, password) => {
    console.log(
        "Let's show credentials for sure :) : " + email + ' ' + password)
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler
  }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext