import { DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_RESTAURANT_ORDER_FAILURE, GET_RESTAURANT_ORDER_REQUEST, GET_RESTAURANT_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType"


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
            case DELETE_ORDER_REQUEST:
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
                if (order.orderId === action.payload.orderId) {
                    return {
                        ...order,
                        orderStatus: action.payload.orderStatus
                    };
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

            case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter((order) => order.orderId !== action.payload.orderId)
            }

        case GET_RESTAURANT_ORDER_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            case DELETE_ORDER_FAILURE:
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