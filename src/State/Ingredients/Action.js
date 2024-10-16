import { api } from "../../components/config/api"
import { CREATE_INGREDIENTS_FAILURE, CREATE_INGREDIENTS_REQUEST, CREATE_INGREDIENTS_SUCCESS, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENTS } from "./ActionType"


export const getIngredientsOfRestaurant = ({ id, token }) => {

    return async (dispatch) => {
        dispatch({ type:  GET_INGREDIENT_CATEGORY_REQUEST })
        try {
            const response = await api.get(`/api/admin/ingredients/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: GET_INGREDIENTS, payload: response.data })
            console.log("get ingredients of restaurant", data);
        }
        catch (error) {
            console.log(error);
        }
    }

}

export const createIngredient = (reqData,token) => {  

    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENTS_REQUEST })
        try {
            const response = await api.post(`/api/admin/ingredients`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: response.data })
            console.log("create ingredient", response.data);
        }
        catch (error) {
            console.log(error);
            dispatch({ type: CREATE_INGREDIENTS_FAILURE, payload: error, })
        }
    }
}


export const createIngredientCategory = (reqData, token) => {
console.log("reqData",reqData,"token",token)
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENTS_REQUEST })
        try {
            const response = await api.post(`/api/admin/ingredient-category`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: response.data })
            console.log("create ingredient category", response.data);
        }
        catch (error) {
            console.log(error);
            dispatch({ type: CREATE_INGREDIENTS_FAILURE, payload: error, })
        }
    }
}

export const updateIngredient = (id, token) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENTS_REQUEST })
        try {
            const {data} = await api.put(`/api/admin/ingredients/${reqData.id}`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            })
            dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: data })
            console.log("update ingredient", response.data);
        }
        catch (error) {
            console.log(error);
            dispatch({ type: CREATE_INGREDIENTS_FAILURE, payload: error, })
        }
    }
}