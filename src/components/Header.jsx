import React from 'react'
import { useAuth } from '../Context/authContext'

function Header() {
 const user = useAuth();

   const handleSignIn = () =>{
        user.setShowLogin(true)
    }

  return (
    <div className='header row'>


        {user.userInfo?.username != "" & user.userInfo != null
        ? 
        <>
            <span className="greeting">Hi, {user.userInfo?.username}</span>
            <button className='btn2' onClick={()=>user.setUserInfo(null)}>Sign Out</button> 
        </>
        :

        <button className="btn1" onClick={handleSignIn}>Sign In</button>}


       <button className="cart_btn btn1">My Cart</button>
       <button className="btn2">Order History</button>
    </div>
  )
}

export default Header