import { api } from "../../components/config/api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS
} from "./ActionTypes";


export const createOrder = (reqData,token) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST })
        try {
            const { data } = await api.post('/api/order/create', token)
            console.log("create order", data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error, })
        }
    }
}

export const getUsersOrders = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST})
        try {
            const { data } = await api.get(`/api/order?userId=${reqData.orderId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
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

