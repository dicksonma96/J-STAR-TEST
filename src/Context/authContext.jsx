import React, {useContext, useState, useEffect} from 'react'
import {updateData} from '../Tools/SignInPromise'

const AuthContext  = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);  
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const set_user_info =(info) =>{        
    if(info != null && userInfo !=null){
      setLoading(true);
      updateData(info).finally(()=>setLoading(false))  
    }
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
      loading
      }} >
        {props.children}
    </AuthContext.Provider>
  )
}
