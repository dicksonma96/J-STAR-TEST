import React from 'react'
import { useAuth } from '../Context/authContext'

function Reset() {
    const user = useAuth();

  const defaultData = {
    "users": [
      {
        "id": "1",
        "username": "User1",
        "password": "123456",
        "cart": [],
        "order": []
      },
      {
        "id": "2",
        "username": "ElonMusk",
        "password": "tesla123",
        "cart": [],
        "order": []
      },
      {
        "id": "3",
        "username": "123",
        "password": "123",
        "cart": [],
        "order": []
      }
    ]
  }

  const handleReset = async() =>{
    try{
        user.setLoading(true);
        let res = await fetch(
            "https://api.jsonbin.io/v3/b/6444dbadb89b1e22998fcb85",
            {
              method: "PUT",
              headers: {
                "X-ACCESS-KEY":
                  "$2b$10$i3Vn9FP..ooifcRShouNxui9GKXqjTVsX1lYSieQTuo0x6pKLsu2m",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(defaultData),
            }
          ); 
        
    }
    catch(e){
        console.log(e)
    }
    finally{
       user.setLoading(false);
       user.setUserInfo(null);
       sessionStorage.removeItem('userSession');
    }    
  }

  return (
    <>
    <br />
    <em style={{color:'grey'}}>For demonstration purpose, click the button below to clear cart and order history from the db</em>
    <button className="reset_btn" onClick={handleReset}>RESET DATA</button>
    </>
  )
}

export default Reset