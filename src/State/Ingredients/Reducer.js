import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENTS_FAILURE, CREATE_INGREDIENTS_SUCCESS, DELETE_INGREDIENT, DELETE_INGREDIENT_CATEGORY, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./ActionType"

const initialState = {
    ingredients: [],
    update: null,
    category: [],
    token: null,

}

export const ingredientReducer = (state = initialState, action) => {
    switch (
    action.type
    ) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }

        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            }

        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
        case CREATE_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
                token:localStorage.getItem('token')
            }

        case UPDATE_STOCK:
            return {
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map(
                    ingredient => ingredient._id === action.payload._id
                        ? action.payload : ingredient),
            }
        case CREATE_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

            case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    ingredient => ingredient.ingredientsItemId !== action.payload
                )
            }

            case DELETE_INGREDIENT_CATEGORY:
            return {
                ...state,
                category: state.category.filter(
                    category => category.ingredientCategoryId !== action.payload
                )
            }

        default:
            return state
    }
}   

export default ingredientReducer;
