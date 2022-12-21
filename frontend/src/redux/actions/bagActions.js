import axios from 'axios'
import { API } from '../../config'
import { ADD_TO_BAG, REMOVE_FROM_BAG, SAVE_DELIVERY_ADDRESS } from '../constants/bagConstants'

export const addToBag = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`${API}/fooddetails/${id}`)
    dispatch({
        type: ADD_TO_BAG,
        payload: {
            food: data._id,
            name: data.food_name, 
            price: data.food_price,
            description: data.food_description,
            image: data.food_image,
            quantity
        }
    })
    localStorage.setItem('bag_items', JSON.stringify(getState().bag.bag_items))
}

export const removeFromBag = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_BAG,
        payload: id
    })
    localStorage.setItem('bag_items', JSON.stringify(getState().bag.bag_items))
}

export const saveDeliveryAddress = (delivery_address) => async(dispatch, getState) => {
    dispatch({
        type: SAVE_DELIVERY_ADDRESS,
        payload: delivery_address
    })
    localStorage.setItem('delivery_address', JSON.stringify(getState().bag.delivery_address))
}