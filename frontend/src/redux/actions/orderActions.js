import { API } from "../../config"
import { MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant"

export const placeOrder = (order, token) => async (dispatch) => {
    try {
        console.log(order)
        dispatch({
            type: NEW_ORDER_REQUEST
        })

        const response = await fetch(`${API}/placeorder`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json)

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.error
        })
    }
}

export const myOrders = (user_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        })

        const response = await fetch(`${API}/userorder/${user_id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.error
        })
    }
}

export const orderDetails = (order_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const response = await fetch(`${API}/orderdetails/${order_id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: response
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.error
        })
    }
}