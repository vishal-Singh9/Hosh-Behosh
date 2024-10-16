import { GET_RESTAURANT_ORDER_FAILURE, GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType"


const initialState = {
    orders: [],
    error: null,
    loading: false
}

const restaurantOrderReducer = (state = initialState, action) => {
    switch (
    action.type
    ) {
        case GET_RESTAURANT_ORDER_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_RESTAURANT_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case UPDATE_ORDER_STATUS_SUCCESS:
            const updatedOrders = state.orders.map((order) => {
                if (order._id === action.payload._id) {
                    return action.payload;
                }
                return {
                    ...state,
                    orders: updatedOrders,
                    loading: false
                };
            })
            return {
                ...state,
                loading: false,
                orders: action.payload
            }

        case GET_RESTAURANT_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default restaurantOrderReducer;