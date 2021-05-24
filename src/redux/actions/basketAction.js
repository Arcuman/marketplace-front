// import H from "history";
import {ADD_TO_BASKET, REMOVE_FROM_BASKET, ADD_QUANTITY_TO_BASKET, CLEAR_BASKET} from '../constants/basket'

export const addToBasket = function (product) {

    return {
        type:ADD_TO_BASKET,
        payload: product
    };
};

export const addQuantityToBasket = function (product, quantity) {

    return {
        type:ADD_QUANTITY_TO_BASKET,
        payload: {product, quantity}
    };
};

export const removeFromBasket = function (productId) {

    return {
        type:REMOVE_FROM_BASKET,
        payload: productId
    };
};

export const clearBasket = function () {
    
    return {
        type:CLEAR_BASKET,
    };
};
