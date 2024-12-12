import * as actionTypes from "./ActionType"

const initialState = {
    menuItems: [],
    error: null,
    loading: false,
    searchResults: [],
    message: null
}

const menuItemReducer = (state = initialState, action) => {
    switch (
    action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANTS_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
            case actionTypes.GET_MENU_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: action.payload
        }
        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
                message: "Food createed Successfully"
            };
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANTS_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: action.payload
            };
        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.filter((item) => item.foodId !== action.payload)
            };
        case actionTypes.UPDATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: state.menuItems.map((item) => item._id === action.payload._id ? action.payload : item)
            };
        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                searchResults: action.payload
            };
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
            case actionTypes.GET_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANTS_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };
        default:
            return state;



    }

}

export default menuItemReducer;