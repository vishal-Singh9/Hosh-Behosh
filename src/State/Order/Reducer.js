import * as actionTypes from "./ActionTypes";

const initialState = {
  loading: false,
  error: null,
  orders: [],
  createOrderMessage: null, 
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          createOrderMessage: null, 
        };

        case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        createOrderMessage: "Order created successfully.",
      };

  
   
    case actionTypes.GET_USERS_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case actionTypes.GET_USERS_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

   
    
    case actionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        createOrderMessage: "Failed to create order.", // Optional failure message
      };

    default:
      return state;
  }
};
