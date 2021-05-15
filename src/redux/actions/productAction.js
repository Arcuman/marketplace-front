// import H from "history";
import {PRODUCTS_REQ, PRODUCTS_REQ_SUCCESS, PRODUCTS_REQ_FAIL, PRODUCT_REQ, PRODUCT_REQ_SUCCESS, PRODUCT_REQ_FAIL, PRODUCT_CLEAR} from '../constants/product'

export const productsReq = function () {

    return {
        type:PRODUCTS_REQ
    };
};

export const productsReqSuccess = function (products) {

    return {
        type:PRODUCTS_REQ_SUCCESS,
        payload: products
    };
};

export const productsReqFail = function (errorMessage) {

    return {
        type:PRODUCTS_REQ_FAIL,
        payload: errorMessage
    };
};


export const productClear = function (productId) {

    return {
        type:PRODUCT_CLEAR,
    };
};

export const productReq = function (productId) {

    return {
        type:PRODUCT_REQ,
        payload: productId 
    };
};

export const productReqSuccess = function (product) {

    return {
        type:PRODUCT_REQ_SUCCESS,
        payload: product
    };
};

export const productReqFail = function (errorMessage) {

    return {
        type:PRODUCT_REQ_FAIL,
        payload: errorMessage
    };
};
