
import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./State/Authentication/Reducer";
import restaurantReducer from "./State/Restaurant/Reducer";
import menuItemReducer from "./State/Menu/Reducer";
import cartReducer from "./State/Cart/Reducer";
import { orderReducer } from "./State/Order/Reducer";
import restaurantOrderReducer from "./State/Restaurant Order/Reducer";
import ingredientReducer from "./State/Ingredients/Reducer";
import addressReducer from "./State/Address/Reducer";



const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantOrderReducer,
    ingredients: ingredientReducer,
    address: addressReducer,

})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;