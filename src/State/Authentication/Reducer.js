import { isPresentInFavorites } from "../../components/config/logic"
import { ADD_TO_FAVORITES_FAILURE, ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_OTP_STATE, SEND_OTP_FAILURE, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, VERIFY_OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    favorites: [],
    success: null,
    token: null,
    otpSent: false,
    otpVerified: false,

}
const authReducer = (state = initialState, action) => {

    switch (
    action.type
    ) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITES_REQUEST:
        case SEND_OTP_REQUEST:
        case VERIFY_OTP_REQUEST:
            case UPDATE_PASSWORD_REQUEST:


            return {
                ...state,
                isLoading: true, error: null, success: null
            }


        case REGISTER_SUCCESS:

            return {
                ...state,
                token: action.payload,
                isLoading: false,
                success: "Registered Successfully"
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                token: action.payload.token,
                isLoading: false,
                favorites: action.payload.favorites,
                success: "Logged In Successfully"
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                token: localStorage.getItem("token"),
                isLoading: false,
                favorites: action.payload.favorites,
                success: "User Fetched Successfully"
            }

        case SEND_OTP_SUCCESS:

        console.log("otp",action.payload)
            return {
                ...state,
                loading: false,
                otpSent: true,
            };

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                otpVerified: true,
            };

            case UPDATE_PASSWORD_SUCCESS:
                console.log("otp",action.payload)
                return {
                  ...state,
                  loading: false,
                  success: true,
                  error: null,
                };

        case ADD_TO_FAVORITES_SUCCESS:

            return {
                ...state,
                favorites: isPresentInFavorites(state.favorites, action.payload)
                    ? state.favorites.filter((item) => item.restaurantId !== action.payload.restaurantId) : [action.payload, ...state.favorites],

                isLoading: false,
                success: "Added to Favorites",

                error: null

            }

        case LOGOUT:
            return initialState;


        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case SEND_OTP_FAILURE:
        case VERIFY_OTP_FAILURE:

        case ADD_TO_FAVORITES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            }
            case UPDATE_PASSWORD_FAILURE:
                return {
                  ...state,
                  loading: false,
                  success: false,
                  error: action.payload,
                };
        case RESET_OTP_STATE:
            return {
                ...initialState,
            };

        default:
            return state
    }
}
export default authReducer