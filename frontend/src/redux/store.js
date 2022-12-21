import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import bagReducer from "./bagReducer";
import { myOrderReducer, orderDetailsReducer, orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
    bag: bagReducer,
    order: orderReducer,
    myOrders : myOrderReducer,
    orderDetails : orderDetailsReducer
})

const initialState = {
    bag: {
        bag_items: localStorage.getItem('bag_items')? JSON.parse(localStorage.getItem('bag_items')): [],
        delivery_address: localStorage.getItem('delivery_address')? JSON.parse(localStorage.getItem('delivery_address')): {}
    }
}

const middleware = [thunk]

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))