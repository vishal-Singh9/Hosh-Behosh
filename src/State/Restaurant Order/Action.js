import { api } from "../../components/config/api"
import {
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    GET_RESTAURANT_ORDER_FAILURE,
    GET_RESTAURANT_ORDER_REQUEST,
    GET_RESTAURANT_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType"


export const updateOrderStatus = ({ orderId, orderStatus, token }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })
        try {
            const { data } = await api.put(`/api/admin/order/status?orderId=${orderId}&orderStatus=${orderStatus}`, orderStatus, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data})
            console.log("update order status", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error, })
        }
    }

}

export const fetchRestaurantOrders = ({ restaurantId, orderStatus, token }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_ORDER_REQUEST })
        try {
            const { data } = await api.get(`/api/admin/order/restaurant?restaurantId=${restaurantId}&orderStatus=${orderStatus}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_RESTAURANT_ORDER_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_RESTAURANT_ORDER_FAILURE, payload: error, })
        }
    }

}


export const deleteOrderStatus = ({ orderId, token }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_ORDER_REQUEST })
        try {
            const { data } = await api.delete(`/api/admin/order/cancel?orderId=${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_ORDER_SUCCESS, payload: data })
            console.log("delete order", data);
        } catch (error) {
            dispatch({ type: DELETE_ORDER_FAILURE, payload: error })
            console.log(error);
        }
    }
}