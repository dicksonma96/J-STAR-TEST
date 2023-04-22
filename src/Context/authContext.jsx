import React, {useContext, useState} from 'react'

const AuthContext  = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);  
  const [showLogin, setShowLogin] = useState(false);

  const set_user_info =(info) =>{    
    setUserInfo(info)
  }
  const set_show_login =(bool) =>{
    setShowLogin(bool)
  }

  return (
    <AuthContext.Provider value={{
      userInfo,
      setUserInfo:set_user_info,
      showLogin,
      setShowLogin:set_show_login,
      }} >
        {props.children}
    </AuthContext.Provider>
  )
}
