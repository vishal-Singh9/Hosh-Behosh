import { api } from "../../components/config/api";
import { ADD_TO_FAVORITES_SUCCESS } from "../Authentication/ActionType";
import { UPDATE_MENU_ITEM_FAILURE } from "../Menu/ActionType";
import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    CLEAR_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS
} from "./ActionType";

export const findCart = (token) => {

    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST })
        try {
            const response = await api.get('/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data })
            console.log("find cart", response.data);
        } catch (error) {
            console.log(error);
            dispatch({ type: FIND_CART_FAILURE, payload: error, })
        }
    }
}

export const addItemToCart = ( reqData,token) => {
    console.log("reqData", reqData, "token", token)
    const {foodId, quantity, ingredients} = reqData
    return async (dispatch) => {
        dispatch({ type: ADD_TO_CART_REQUEST })
        try {
            const { data } = await api.put('/api/cart-item/add', {foodId,quantity,ingredients}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("add cart", data);
            dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: ADD_TO_CART_FAILURE, payload: error, })
        }
    }
}


export const getAllCartItems = (reqData) => {

    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST })
        try {
            const { data } = await api.get(`/api/cart/${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            console.log("get all cart", data);
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error, })
        }
    }

}

export const clearCartAction = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST })
        try {
            const { data } = await api.delete(`/api/cart/${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch({ type: CLEAR_CART_SUCCESS, payload: data })
            console.log("clear cart", data);
        } catch (error) {
            dispatch({ type: CLEAR_CART_FAILURE, payload: error.message, })
            console.log(error);
        }
    }
}

export const removeCartItem = (cartItemId,token) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST })
        try {
            const { data } = await api.delete(`/api/cart/${reqData.cartItemId}/items/${reqData.itemId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            console.log("remove cart", data);
            dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId})
        } catch (error) {
            console.log(error);
            dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error, })
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST })
        try {
            const { data } = await api.put(`/api/cart/${reqData.cartId}/items/${reqData.itemId}`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            console.log("update cart", data);
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_MENU_ITEM_FAILURE, payload: error, })
        }
    }
}