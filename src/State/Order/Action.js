import { api } from "../../components/config/api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS
} from "./ActionTypes";


export const createOrder = (token,deliveryAddress,restaurantId) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST })
        try {
            const { data } = await api.post('/api/order/create', {restaurantId,token,deliveryAddress}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error, })
        }
    }
}

export const getUsersOrders = ({ token,userId}) => {

    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST})
        try {
            const { data } = await api.get(`/api/order/user?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error, })
        }
    }
}

