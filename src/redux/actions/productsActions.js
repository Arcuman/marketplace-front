import { FETCH_PRODUCTS, CREATE_PRODUCT } from '../constants/products'

export const fetchProducts = function () {

    return {
        type:FETCH_PRODUCTS,
    };
};

export const createProduct = function (newProduct, history, clearForm) {

    return {
        type:CREATE_PRODUCT,
        payload: {
            newProduct,
            history,
            clearForm
        }
    };
};