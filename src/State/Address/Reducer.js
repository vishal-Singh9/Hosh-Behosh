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
    SELECT_ADDRESS_FAILURE, // Added Delete Action Types
} from "./ActionType";

const initialState = {
    addresses: [],
    isLoading: false,
    error: null,
    success: null,
    selectedAddress: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDRESSES_REQUEST:
        case CREATE_ADDRESS_REQUEST:
        case UPDATE_ADDRESS_REQUEST:
        case USER_ADDRESS_REQUEST:
        case DELETE_ADDRESS_REQUEST:
        case SELECT_ADDRESS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null,
            };

        case FETCH_ADDRESSES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addresses: action.payload,
                error: null,
                success: "Addresses fetched successfully",
            };

        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addresses: [...state.addresses, action.payload],
                success: "Address created successfully",
            };

        case UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addresses: state.addresses.map((address) =>
                    address.id === action.payload.id ? action.payload : address
                ),
                error: null,
                success: "Address updated successfully",
            };
        case SELECT_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedAddress: action.payload, // Set the selected address
                success: "Address selected successfully",
                error: null,
            };


        case USER_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addresses: action.payload,
            };

        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addresses: state.addresses.filter(
                    (address) => address.addressId !== action.payload.addressId // Remove deleted address
                ),
                success: "Address deleted successfully",
                error: null,
            };

        case FETCH_ADDRESSES_FAILURE:
        case CREATE_ADDRESS_FAILURE:
        case UPDATE_ADDRESS_FAILURE:
        case USER_ADDRESS_FAILURE:
        case DELETE_ADDRESS_FAILURE:
        case SELECT_ADDRESS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null,
            };

        default:
            return state;
    }
};

export default addressReducer;
