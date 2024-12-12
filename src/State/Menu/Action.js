import { api } from "../../components/config/api";
import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_ITEM_FAILURE,
    GET_MENU_ITEM_REQUEST,
    GET_MENU_ITEM_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANTS_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANTS_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANTS_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS
} from "./ActionType";


export const createMenuItem = ({ reqData, token }) => {

    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST })
        try {
            const {data} = await api.post(`/api/admin/food/create`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("create menu item", data);
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error, })
        }
    }
}

export const getMenuItems = ({restaurantId, token}) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/food/restaurant?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_MENU_ITEM_FAILURE, payload: error })
        }
    }
}


export const getMenuItemsByRestaurantId = ({ token,restaurantId, vegetarian, nonveg, seasonal, foodCategory }) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/food/restaurant?restaurantId=${restaurantId}
               &vegetarian=${vegetarian}&nonveg=${nonveg}&seasonal=${seasonal}&foodCategory=${foodCategory}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_SUCCESS, payload: data })
            console.log("get menu item", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANTS_ID_FAILURE, payload: error })
        }
    }
}

export const searchMenuItem = ({ keyword, token }) => {
    console.log("keyword", keyword,token)

    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(`/api/food/search?keyword=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("get menu item", data);
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data })
        } catch (error) {
            console.log(error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error })
        }
    }

}


export const updateMenuItem = ({ menu, token, foodId }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEM_REQUEST })
        try {
            const res = await api.put(`/api/admin/menu/${foodId}`, menu, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("update menu item", res.data);
            dispatch({ type: UPDATE_MENU_ITEM_SUCCESS, payload: res.data })
        } catch (error) {
            console.log(error);
            dispatch({ type: UPDATE_MENU_ITEM_FAILURE, payload: error, })
        }
    }
}

export const deleteMenuItem = ({ foodId, token }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST })
        try {
            const {data} = await api.delete(`/api/admin/food/delete?foodId=${foodId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: data})
            console.log("delete menu item", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error, })
        }
    }
}
