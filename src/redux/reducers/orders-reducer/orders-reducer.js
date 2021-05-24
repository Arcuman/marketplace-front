import {
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAIL,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS
} from '../../constants/orders'
import { UPDATE_PROFILE_FAIL} from "../../constants/profile";

const initialState = {
    orders: [],
    errorMessage: '',
    order: null
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_ORDER_SUCCESS:
            const newSendOrder = state.orders.concat();
            newSendOrder.push(action.payload);
            return {
                ...state,
                orders: newSendOrder,
                errorMessage: ''
            };
        case SEND_ORDER_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            }; 
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                errorMessage: ''
            };
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
                errorMessage: ''
            };
        case FETCH_ORDER_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                errorMessage: ''
            };
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
};

export default ordersReducer;
