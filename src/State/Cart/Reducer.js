import { LOGOUT } from "../Authentication/ActionType"
import * as actionTypes from "./ActionType"

const initialState = {
    cartItems: [],
    error: null,
    loading: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
    switch (
    action.type
    ) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items,
            }
        case actionTypes.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
            };
        case actionTypes.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) => {
                    if (item._id === action.payload.id) {
                        return action.payload
                    } else {
                        return item
                    }
                })
            };
        case actionTypes.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter((item) => {
                    return item._id !== action.payload
                })
            };
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.UPDATE_CART_ITEM_FAILURE:
        case actionTypes.REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                cartItems: [],
                cart: null,
                success: "Logged out successfully"
            };
        default:
            return state;

    }
}
export default cartReducer;