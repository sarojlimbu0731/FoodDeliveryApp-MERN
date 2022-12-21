import { NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "./constants/orderConstant";

export const orderReducer = (state={}, action) => {
    switch(action.type){
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case NEW_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case NEW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const myOrderReducer = (state=[], action) => {
    switch(action.type){
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}
export const orderDetailsReducer = (state={}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}