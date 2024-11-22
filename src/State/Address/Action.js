// addressActions.js
import axios from 'axios';
import { api } from "../../components/config/api";
import {
    FETCH_ADDRESSES_REQUEST,
    FETCH_ADDRESSES_SUCCESS,
    FETCH_ADDRESSES_FAILURE,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_SUCCESS,
    USER_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    SELECT_ADDRESS_REQUEST,
    SELECT_ADDRESS_SUCCESS,
    SELECT_ADDRESS_FAILURE,
} from './ActionType';

// Fetch addresses
export const fetchAddresses = (token) => async (dispatch) => {

    dispatch({ type: FETCH_ADDRESSES_REQUEST });
    try {
        const response = await api.get(`/api/addresses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error.message });
    }
};

// Create address
export const createAddress = (reqData, token, userId) => async (dispatch) => {
    const { street, city, state, pinCode, country } = reqData;
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    try {
        // API call
        const { data } = await api.post(`/api/addresses/create?userId=${userId}`,
            { street, city, state, pinCode, country, token, userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error.message });
        console.error("Error creating address:", error);
    }
};

export const userAddress = (token, userId, temporary = false) => async (dispatch) => {
    dispatch({ type: USER_ADDRESS_REQUEST });
    try {
        const { data } = await api.get(
            `api/addresses/user?userId=${userId}&temporary=${temporary}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: USER_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_ADDRESS_FAILURE, payload: error.message });
        console.error("Error user address:", error);
    }
};

export const deleteAddress = (token, addressId) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
        const { data } = await api.delete(
            `api/addresses/delete?addressId=${addressId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: {  addressId } });
    } catch (error) {
        dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
        console.error("Error deleting address:", error);
    }
};

// Update address
export const updateAddress = (addressId, addressData) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    try {
        const response = await axios.put(`${API_URL}/addresses/${addressId}`, addressData);
        dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
    }
};

//select address
export const selectAddress = (addressId) => {
    return async (dispatch, getState) => {
        dispatch({ type: SELECT_ADDRESS_REQUEST });

        try {
            const { addresses } = getState().address; // Get current addresses from state
            const selectedAddress = addresses.find(
                (address) => address.addressId === addressId
            );

            if (!selectedAddress) {
                throw new Error("Address not found");
            }

            dispatch({
                type: SELECT_ADDRESS_SUCCESS,
                payload: selectedAddress,
            });
        } catch (error) {
            dispatch({
                type: SELECT_ADDRESS_FAILURE,
                payload: error.message || "Failed to select address",
            });
        }
    };
};

