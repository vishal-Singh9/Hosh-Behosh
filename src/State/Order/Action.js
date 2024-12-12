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
   console.log("token",token,"deliveryAddress",deliveryAddress,"restaurantId",restaurantId)
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST })
        try {
            const { data } = await api.post('/api/order/create', {restaurantId,token,deliveryAddress}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
            console.log("create order yash", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error, })
        }
    }
}

export const getUsersOrders = ({ token,userId}) => {
    console.log( "token", token,userId)

    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST})
        try {
            const { data } = await api.get(`/api/order/user?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("get order", data);
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error, })
        }
    }
}

