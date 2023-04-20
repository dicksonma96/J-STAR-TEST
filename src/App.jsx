import { useState } from 'react'
import Product_List from './components/Product_List'
import Header from './components/Header'
import Modal from './components/Modal'
import {useAuth} from './Context/authContext'

function App() {

  const auth = useAuth();

  return (
    <>
        <Header/>
        <Product_List/>    
        {
          auth.showLogin &&
        <Modal closeModal={()=>auth.setShowLogin(false)} window_width={'400px'}>
          <div className="col signin">
            <h1>Sign In</h1>
            <input type="text" />
            <input type="password" />
            <button className="btn1">Sign In</button>
          </div>
        </Modal>  
        }
    </>
  )
}

export default App
