import { API } from "../config"

export const getCategories = () => {
    return fetch(`${API}/viewcategories`,{
        method: "GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const addCategory = (category_name, token) => {
    return fetch(`${API}/postCategory`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({category_name})
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const findCategory = (id) => {
    return fetch(`${API}/categorydetails/${id}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updateCategory = (id, category_name, token) => {
    return fetch(`${API}/updatecategory/${id}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({category_name})
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const deleteCategory = (id, token) => {
    return fetch(`${API}/deleteCategory/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}