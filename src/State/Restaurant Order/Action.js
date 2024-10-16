import { api } from "../../components/config/api"
import {
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS
} from "./ActionType"


export const updateOrderStatus = ({ orderId, orderStatus, token }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })
        try {
            const { data } = await api.put(`/api/admin/order/${orderId}`, orderStatus, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const updatedOrder= data;

            console.log("update order status", updatedOrder);

            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder})
            console.log("update order status", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error, })
        }
    }

}

export const fetchRestaurantOrders = ({ restaurantId,orderStatus, token }) => {

    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })
        try {
            const { data } = await api.get(`/api/admin/order/${restaurantId}?status=${orderStatus}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const orders = data;
            console.log("restaurant orders", orders);

            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: orders})
            console.log("update order status", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error, })
        }
    }

}