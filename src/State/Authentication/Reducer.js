import { isPresentInFavorites } from "../../components/config/logic"
import { ADD_TO_FAVORITES_FAILURE, ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    favorites: [],
    success: null,
    token: null,

}
const authReducer = (state = initialState, action) => {
    switch (
    action.type
    ) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITES_REQUEST:
            return {
                ...state,
                isLoading: true, error: null, success: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                isLoading: false,
                success: "Registered Successfully"
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,

                isLoading: false,
                favorites: action.payload.favorites
            }

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
        case ADD_TO_FAVORITES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            }

        default:
            return state
    }
}
export default authReducer