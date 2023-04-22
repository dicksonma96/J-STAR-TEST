import React, {useState, useRef, useEffect} from 'react'
import { useAuth } from '../Context/authContext'
import logo from '../images/logo.png'
import Modal from './Modal';
import MyCart from './MyCart';

function Header() {
 const user = useAuth();
 const [showDropdown, setShowDropdown] = useState(false);
 const [showCart, setShowCart] = useState(false);
 const dropdownRef = useRef();

   const handleSignIn = () =>{
        user.setShowLogin(true)
    }

    useEffect(()=>{
      document.addEventListener("mousedown",(e)=>{
        if(dropdownRef.current != undefined){
          if(!dropdownRef.current?.contains(e.target)){
            setShowDropdown(false);
          }
        }      
      })
    },[])

  return (
    <>
    <div className='header row'>
        <img className='logo' src={logo} alt="logo" />

        {user.userInfo?.username != "" & user.userInfo != null
        ? 
        <>
            <div className="user_info">
              <div className="username row" onClick={()=>setShowDropdown(!showDropdown)}><span>{user.userInfo?.username} </span> <div className="arrow-down"></div></div>
              {showDropdown &&
                <div className="col" ref={dropdownRef}>
                  <button>Order History</button>
                  <button onClick={()=>{
                    user.setUserInfo(null);
                    setShowDropdown(false);
                    }}>Sign Out</button> 
                </div>
              }
            </div>
        </>
        :

        <button className="btn1 signIn_btn" onClick={handleSignIn}>Sign In</button>}

        {user.userInfo !=null &&
           <>
            <button className="cart_btn btn1" onClick={()=>{
              if(user.userInfo != null){
                setShowCart(true);
              }
              else{ 
                user.setShowLogin(true);
              }
            }}>My Cart {`[${user.userInfo.cart.length}]`  }</button>
           </>
        }
       
       
    </div>

     {
      showCart 
      &&
      <Modal closeModal={()=>setShowCart(false)} window_width={'500px'}>
        <MyCart />
      </Modal>
     }   

    </>
  )
}

export default Header