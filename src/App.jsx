import { useState } from 'react'
import Product_List from './Components/Product_List'
import Header from './Components/Header'
import Banner from './Components/Banner'
import Modal from './Components/Modal'
import Loader from './Components/Loader'
import {useAuth} from './Context/authContext'
import {signIn} from './Tools/SignInPromise'

function App() {

  const auth = useAuth();
  const [loginInfo, setLoginInfo] = useState({
    username:'',
    password:''
  })
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async () =>{
    try{
      setLoginLoading(true);
      let res = await signIn(loginInfo.username, loginInfo.password)     
      auth.setUserInfo(res.data);        
      auth.setShowLogin(false);       
    }
    catch(e){ 
      alert(e.msg);
    }
    finally{
      setLoginLoading(false);
    }
  }

  return (
    <>
        <Header/>
        <Banner />
        <Product_List/>    
        
        {
          auth.showLogin &&
        <Modal closeModal={()=>auth.setShowLogin(false)} window_width={'350px'}>
          <div className="col signin">
            <h1>Sign In</h1>
            <input 
            type="text" 
            placeholder='Username' 
            onChange={(e)=>{
              setLoginInfo({...loginInfo,username:e.target.value})
              }} />
            <input 
            type="password"
            placeholder='Password'
            onChange={(e)=>{
              setLoginInfo({...loginInfo,password:e.target.value})
            }} />
            {loginLoading ?            
             <button className="btn1" disabled>Signing In...</button>
             :
             <button className="btn1" onClick={handleLogin}>Sign In</button>
            }

          </div>
        </Modal>  
        }
        {       
          auth.loading &&  <Loader />
        } 

    </>
  )
}

export default App
