import { API } from "../config";


// user register
export const userRegister = (user) => {
    return fetch(`${API}/register`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}

// email confirmation
export const userConfirmation = (token)=>{
    return fetch(`${API}/verifyUser/${token}`,{
        method:"GET"
    })
    .then(response => response.json())
    .catch(error=>console.log(error))
}

// forget password
export const forgetpassword = (email) => {
    return fetch(`${API}/forgetpassword`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

//reset Password
export const resetPassword = (password, token) => {
    return fetch(`${API}/resetPassword/${token}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password})
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

// sign in
export const signin = (email, password) => {
    return fetch(`${API}/signin`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

// authenticate
export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}

//  to check if user is signed in or not
export const isAuthenticated = () => {
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}
// signout
export const signout = () => {
    return fetch(`${API}/signout`, {
        method:"GET"
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

 //get user list
 export const getUsers = ()=> {
    return fetch(`${API}/userlist`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

//to update user
export const updateUser = (id,email,username, token) => {
    return fetch(`${API}/updateuser/${id}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({email,username})
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}



//to delete a user
export const deleteUser = (id,token)=>{
    return fetch(`${API}/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        }

    }).then(res=>res.json())
    .catch(err=>console.log(err))
}
