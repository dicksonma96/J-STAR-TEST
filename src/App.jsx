import { useState } from 'react'
import Product_List from './Components/Product_List'
import Header from './Components/Header'
import Modal from './Components/Modal'
import {useAuth} from './Context/authContext'
import {signIn} from './Tools/SignInPromise'

function App() {

  const auth = useAuth();
  const [loginInfo, setLoginInfo] = useState({
    username:'',
    password:''
  })

  const handleLogin = async () =>{
    try{
      console.log(loginInfo)
      let res = await signIn(loginInfo.username, loginInfo.password)
      auth.setUserInfo(res.data);     
      auth.setShowLogin(false); 
    }
    catch(e){ 
      alert(e.msg);
    }
  }

  return (
    <>
        <Header/>
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
            <button className="btn1" onClick={handleLogin}>Sign In</button>
          </div>
        </Modal>  
        }
    </>
  )
}

export default App
