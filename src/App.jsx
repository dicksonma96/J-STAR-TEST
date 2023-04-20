import { useState } from 'react'
import Product_List from './Components/Product_List'
import Header from './Components/Header'
import Modal from './Components/Modal'
import {useAuth} from './Context/authContext'

function App() {

  const auth = useAuth();

  return (
    <>
        <Header/>
        <Product_List/>    
        {
          auth.showLogin &&
        <Modal closeModal={()=>auth.setShowLogin(false)} window_width={'350px'}>
          <div className="col signin">
            <h1>Sign In</h1>
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password'/>
            <button className="btn1">Sign In</button>
          </div>
        </Modal>  
        }
    </>
  )
}

export default App
