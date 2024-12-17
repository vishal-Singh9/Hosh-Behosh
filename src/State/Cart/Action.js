import { api } from "../../components/config/api";
import { ADD_TO_FAVORITES_SUCCESS } from "../Authentication/ActionType";
import { UPDATE_MENU_ITEM_FAILURE } from "../Menu/ActionType";
import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
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
        } catch (error) {
            dispatch({ type: FIND_CART_FAILURE, payload: error, })
        }
    }
}

export const addItemToCart = (reqData, token, cartItemId) => {

    const { foodId, quantity, ingredients } = reqData
    return async (dispatch) => {
        dispatch({ type: ADD_TO_CART_REQUEST })
        try {
            const { data } = await api.put('/api/cart-item/add', { foodId, quantity, ingredients }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: { ...data, cartItemId } })


            if (data) {
                dispatch(findCart(token));
            }
        } catch (error) {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: error, })
        }
    }
}


export const getAllCartItems = (reqData) => {

    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST })
        try {
            const { data } = await api.get(`/api/cart/${reqData?.cartId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error, })
        }
    }

}

export const clearCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST })
        try {
            const { data } = await api.delete(`/api/cart/clear`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CLEAR_CART_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: CLEAR_CART_FAILURE, payload: error.message, })
        }
    }
}

export const removeCartItem = (cartItemId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST })
        try {
            const { data } = await api.delete(`/api/cart-item/remove?cartItemId=${cartItemId.cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${cartItemId.token}`
                }
            })

            dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId })
            if (data) {
                dispatch(findCart(cartItemId.token));
            }
        } catch (error) {
            dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error, })
        }
    }
}

export const updateCartItem = (reqData) => {

    const { cartItemId, quantity } = reqData;
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST })
        try {
            const { data } = await api.put(`/api/cart-item/update`, { cartItemId, quantity }, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: UPDATE_MENU_ITEM_FAILURE, payload: error, })
        }
    }
}