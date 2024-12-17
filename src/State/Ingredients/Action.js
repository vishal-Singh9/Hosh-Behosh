import { api } from "../../components/config/api"
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENTS_FAILURE, CREATE_INGREDIENTS_REQUEST, CREATE_INGREDIENTS_SUCCESS, DELETE_INGREDIENT, DELETE_INGREDIENT_CATEGORY, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS } from "./ActionType"


export const createIngredient = ({ reqData, token }) => {

    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENTS_REQUEST })
        try {
            const { data } = await api.post(`/api/admin/ingredients/item/create`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: CREATE_INGREDIENTS_FAILURE, payload: error, })
        }
    }
}

export const getIngredients = ({ restaurantId,token }) => {

    
    return async (dispatch) => {
        try {
            const { data } = await api.get(`/api/admin/ingredients/item/restaurant?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_INGREDIENTS, payload: data })
        }


        catch (error) {
        }
    }
}

export const deleteIngredient = ({  token,ingredientsItemId }) => {
    return async (dispatch) => {
        try {
            const { data } = await api.delete(`/api/admin/ingredients/item/delete?ingredientsItemId=${ingredientsItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: DELETE_INGREDIENT, payload: data })
        }


        catch (error) {
        }
}}



export const createIngredientCategory = ({reqData, token}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST })
        try {
            const { data } = await api.post(`/api/admin/ingredients/category/create`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error, })
        }
    }
}


export const getIngredientsOfRestaurant = ({ restaurantId, token }) => {

    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST })
        try {
            const { data } = await api.get(`/api/admin/ingredients/category/restaurant?restaurantId=${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data })
        }
        catch (error) {
        }
    }

}

export const deleteIngredientCategory = ({ token, ingredientCategoryId }) => {
        return async (dispatch) => {
            try {
                const { data } = await api.delete(`/api/admin/ingredients/category/delete?ingredientCategoryId=${ingredientCategoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch({ type: DELETE_INGREDIENT_CATEGORY, payload: data })
}
            catch (error) {
            }
        }
    }

export const updateIngredient = (id, token) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENTS_REQUEST })
        try {
            const { data } = await api.put(`/api/admin/ingredients/${reqData.id}`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: CREATE_INGREDIENTS_FAILURE, payload: error, })
        }
    }
}