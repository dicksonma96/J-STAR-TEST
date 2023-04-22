import React, {useState} from 'react'
import { useAuth } from '../Context/authContext'
import logo from '../images/logo.png'

function Header() {
 const user = useAuth();
 const [showDropdown, setShowDropdown] = useState(false);

   const handleSignIn = () =>{
        user.setShowLogin(true)
    }

  return (
    <div className='header row'>
        <img className='logo' src={logo} alt="logo" />

        {user.userInfo?.username != "" & user.userInfo != null
        ? 
        <>
            <div className="user_info">
              <div className="username row" onClick={()=>setShowDropdown(!showDropdown)}><span>{user.userInfo?.username} </span>▼</div>
              {showDropdown &&
                <div className="col">
                  <button>Order History</button>
                  <button onClick={()=>user.setUserInfo(null)}>Sign Out</button> 
                </div>
              }
            </div>
        </>
        :

        <button className="btn1 signIn_btn" onClick={handleSignIn}>Sign In</button>}

        {user.userInfo !=null &&
           <>
            <button className="cart_btn btn1">My Cart {`[${user.userInfo.cart.length}]`  }</button>
           </>
        }
       
       
    </div>
  )
}

export default Header