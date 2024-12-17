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
    ADD_TO_FAVORITES_REQUEST,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
    RESET_OTP_STATE,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REQUEST
} from "./ActionType";

export const registerUser = (reqData) => async (dispatch) => {

    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
        if (data.token) localStorage.setItem("token", data.token);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }
}



export const LoginUser = (reqData) => async (dispatch) => {


    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.token) localStorage.setItem("token", data.token);
        if(data.user) localStorage.setItem("user", JSON.stringify(data.user));

        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
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

        dispatch({ type: GET_USER_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
    }
}


export const addTofavorite = ({ restaurantId, token }) => async (dispatch) => {
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
        dispatch({ type: ADD_TO_FAVORITES_FAILURE })
    }
}

export const verifyOtp = (email, otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST })
    try {
        const { data } = await api.post(`/verify-Otp?otp=${otp}&email=${email}`,otp,email);
        

        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, payload: error })
    }
}

export const sendOtp = (email) => async (dispatch) => {
    console.log("osdufbh",email)
    dispatch({ type: SEND_OTP_REQUEST })
    try {
        const { data } = await api.post(`/send-otp?email=${email}`,email);
        
        dispatch({ type: SEND_OTP_SUCCESS, payload: data })
        console.log("otppp",data)
    }
    catch (error) {
        dispatch({ type: SEND_OTP_FAILURE, payload: error })
        console.log("error",error)
    }
    dispatch({
        type: RESET_OTP_STATE
    })}

export const updatePassword = (email,context,passwords) => async (dispatch) => {
    console.log("email",email,"context",context)
    dispatch({ type: UPDATE_PASSWORD_REQUEST})
    try {
       
        const { data } = await api.post(`/change-newPassword?email=${email}&context=${context}`,passwords);
       

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error })          
    }

}


export const logout = () => async (dispatch) => {

    dispatch({
        type: LOGOUT
    })
    try {
        localStorage.clear();

        dispatch({ type: LOGOUT })
    }
    catch (error) {
        dispatch({ type: LOGOUT })
    }
}