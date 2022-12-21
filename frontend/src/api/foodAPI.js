import { API } from "../config"

export const getFoods = () => {
    return fetch(`${API}/foodlist`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

// to get product details
export const viewfoodDetails = (id) => {
    return fetch(`${API}/fooddetails/${id}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

//add new food item
export const addFood = (food, token) => {
    return fetch(`${API}/addfood`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            Authorization:`Bearer ${token}`
        },
        body: food
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))

}


// to update product
export const updateFood = (id, food, token) => {
    return fetch(`${API}/updatefood/${id}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(food)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}



//to delete a product
export const deleteFood = (id,token)=>{
    return fetch(`${API}/deletefood/${id}`,{
        method:"DELETE",
        headers:{
            Authorization : `Bearer ${token}`
        }

    }).then(res=>res.json())
    .catch(err=>console.log(err))
}



// to get filtered product
export const getFilteredFoods = (categoryId) => {
    return fetch(`${API}/getfilteredfood`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify({categoryId})
    })
    .then(res=> res.json())
    .catch(error=>console.log(error))
}

