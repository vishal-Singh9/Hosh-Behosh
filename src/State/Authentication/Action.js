import { api, API_URL } from "../../components/config/api";
import axios from "axios";
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT,
    GET_USER_REQUEST,
    ADD_TO_FAVORITES_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_FAILURE,
    GET_USER_FAILURE,
    GET_USER_SUCCESS,
    ADD_TO_FAVORITES_FAILURE,
    ADD_TO_FAVORITES_REQUEST
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {

    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if (data.token) localStorage.setItem("token", data.token);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data})
        console.log("REGISTER SUCCESSFULLY");
    }
    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("error",error);
    }
}



export const LoginUser = (reqData) => async (dispatch) => {
console.log("reqData", reqData)


    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.token) localStorage.setItem("token", data.token);

        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.token })
  }
    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
        console.log(error);
    }
}


export const getUser = (token) => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.setItem("user", JSON.stringify(data));

        dispatch({ type:GET_USER_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({ type: GET_USER_FAILURE ,payload: error})
        console.log("error",error);
    }
}


export const addTofavorite = ({restaurantId, token }) => async (dispatch) => {
dispatch({ type: ADD_TO_FAVORITES_REQUEST })
    try {
        const { data } = await api.put(`/api/restaurant/add-favorites?restaurantId=${restaurantId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        });

        dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: ADD_TO_FAVORITES_FAILURE})
        console.log("remove",error);
    }
}

export const logout = () => async (dispatch) => {

    dispatch({ type: LOGOUT
     })
    try {
        localStorage.clear();

        dispatch({ type: LOGOUT })
        console.log("LOGOUT SUCCESSFULLY");
    }
    catch (error) {
        dispatch({ type: LOGOUT })
        console.log(error);
    }
}