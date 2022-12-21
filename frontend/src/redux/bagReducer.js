import { ADD_TO_BAG, REMOVE_FROM_BAG, SAVE_DELIVERY_ADDRESS } from "./constants/bagConstants";

const bagReducer = (state = {bag_items: [], delivery_address: {}}, action) => {
    switch (action.type){
        case ADD_TO_BAG:
            const item  = action.payload
            const itemExists = state.bag_items.find(i=>i.food===item.food)
            if(itemExists){
                return {...state,
                bag_items: [...state.bag_items.map(i=>{
                    return i.food === item.food ? item : i 
                })]}
            }
            else{
                return {...state,
                    bag_items: [...state.bag_items, item]}
            }
            

        case REMOVE_FROM_BAG:
            return {
                ...state,
                bag_items: [...state.bag_items.filter(item=>item.food !== action.payload)]
            }

        case SAVE_DELIVERY_ADDRESS:
            return {
                ...state,
                delivery_address:  action.payload 
            }

        default: 
        return state
    }

}

export default bagReducer