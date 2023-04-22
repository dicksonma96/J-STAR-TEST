const users_db = [
    {username:'User1',password:'123456',cart:[],history:[]},
    {username:'ElonMusk', password:'tesla123',cart:[],history:[]}
]

export const signIn = (username,password) =>{

    return new Promise((resolve, reject)=>{      
        let foundUser = users_db.find((user)=> user.username == username)
        
        if(foundUser != undefined){
            if(foundUser.password == password){
                resolve({msg:'Success',data:foundUser});
            } 
            else{
                reject({msg:'Incorrect Password'});
            }
        }
        else{
            reject({msg:'User not found'});
        }
    })

    
}