import { API } from "../config"

//to view all orders
export const getOrders = () => {
    return fetch(`${API}/vieworders`,{
        method: "GET",
    })
    .then(res=> res.json())
    .catch(err=> console.log(err))
}


//to delete an order
export const deleteOrder = (orderId)=>{
    return fetch(`${API}/deleteorder/${orderId}`,{
        method:"DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json"
        }

    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

//to approve and order
export const approveOrder = (orderId, status) => {
    return fetch(`${API}/updateorder/${orderId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify({status})
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}
 



