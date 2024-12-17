import { api } from "../../components/config/api";
import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANTS_CATEGORY,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS
} from "./ActionType";



export const createRestaurant = ({reqData, token}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST })
        try {
            const { data } = await api.post(`/api/admin/restaurant/create`, reqData,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error, })
        }
    }
}



export const getAllRestaurantsAction = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST })
        try {
            const { data } = await api.get(`/auth/all`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // }

            })

            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
        }
    }
}
export const getRestaurantById = ({restaurantId,token}) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`api/restaurant?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        }
    };
};

export const getRestaurantsCategories = ({restaurantId,token}) => {

    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
        try {
            const {data} = await api.get(`/api/category/restaurant?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_RESTAURANTS_CATEGORY_FAILURE,
                payload: error,
            });
        }
    };
};


export const deleteRestaurantCategory = ({ categoryId, token }) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`/api/admin/category/delete?categoryId=${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_RESTAURANTS_CATEGORY, payload: data })
}
        catch (error) {
        }
    }
}

export const getRestaurantByUserId = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST })
        try {
            const { data } = await api.get(`/api/admin/restaurant/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error })
        }
    }
}


export const updateRestaurant = ({ restaurantId, restaurantData, token }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST })
        try {
            const { data } = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error, })
        }
    }
}

export const deleteRestaurant = ({ restaurantId, token }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST })
        try {
            const { data } = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error, })
        }
    }
}


export const updateRestaurantStatus = ({ restaurantId ,token}) => {
    
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST })
        try {
            const { data } = await api.put(`/api/admin/restaurant/update/status?restaurantId=${restaurantId}`,restaurantId, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error, })
        }
    }
}


export const createEventAction = ({reqData, token, restaurantId}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST })
        try {
            const {data} = await api.post(`/api/admin/events/restaurants?restaurantId=${restaurantId}`,reqData,restaurantId,token, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_EVENTS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: CREATE_EVENTS_FAILURE, payload: error, })
        }
    }
}


export const getAllEvents = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST })
        try {
            const res = await api.get(`/api/events`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data })
        } catch (error) {
            dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error, })
        }
    }
}

export const deleteEvent = ({ eventId, token }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST })
        try {
            const res = await api.delete(`/api/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_EVENTS_SUCCESS, payload: data })
        } catch (error) {
            dispatch({ type: DELETE_EVENTS_FAILURE, payload: error, })
        }
    }
}


export const getRestaurantsEvents = ({ restaurantId, token }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST })
        try {
            const res = await api.get(`/api/admin/restaurants/${restaurantId}/events`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data })
        } catch (error) {
            dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error, })
        }
    }
}


export const createCategoryAction = (reqData, token) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST })
        try {
            const res = await api.post(`/api/admin/category/create`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data })
        } catch (error) {
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error, })
        }
    }
}

