import * as actionTypes from "./ActionType"

const initialState = {
    restaurants: [],
    userRestaurants: null,
    user: null,
    restaurant: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
    error: null,
    loading: false,
    token: null
}


const restaurantReducer = (state = initialState, action) => {
    switch (
    action.type
    ) {
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
        case actionTypes.GET_RESTAURANT_BY_USER_ID_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userRestaurants: action.payload
            };
        case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: action.payload
            };

        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurant: action.payload,
            };

        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload.user,
                userRestaurants: action.payload
            }


        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return {

                ...state,
                loading: false,
                open: action.payload
            };
        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: state.restaurants.filter(
                    restaurant => restaurant._id !== action.payload),
                userRestaurants: state.userRestaurants.filter(
                    restaurant => restaurant._id !== action.payload)
            };
        case actionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload]
            };

        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                restaurantsEvents: action.payload,
                events: action.payload
            };


        case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload
            };

        case actionTypes.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                events: state.events.filter(
                    event => event._id !== action.payload),
                restaurantsEvents: state.restaurantsEvents.filter(
                    event => event._id !== action.payload)
            };

        case actionTypes.CREATE_CATEGORY_SUCCESS:

            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload]
            };

        case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categories: action.payload,

            };


        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
            console.log("action.payload", action.payload)
            return {
                ...state,
                loading: false,
                error: null,
                restaurants: action.payload,
                token: action.payload.token,
                userRestaurants: action.payload
            };


        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_USER_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.DELETE_RESTAURANTS_CATEGORY:
            return {
                ...state,
                loading: false,
                error: null,
                categories: state.categories.filter(
                    category => category.categoryId !== action.payload),
            };
        default:
            return state;
    }
}

export default restaurantReducer