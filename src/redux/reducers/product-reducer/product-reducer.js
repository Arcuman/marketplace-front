import {PRODUCTS_REQ, PRODUCTS_REQ_SUCCESS, PRODUCTS_REQ_FAIL, PRODUCT_REQ, PRODUCT_REQ_SUCCESS, PRODUCT_REQ_FAIL, PRODUCT_CLEAR} from '../../constants/product'

const initialState = {
    products: null,
    errorMessage: '',
    product: null,
    loading: false
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_REQ:
            return {
                ...state,
                loading: true,
            };
        case PRODUCTS_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        case PRODUCTS_REQ_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            };
        case PRODUCT_CLEAR:
            return {
                ...state,
                product: null,
            };
        case PRODUCT_REQ:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            };
        case PRODUCT_REQ_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
};

export default productReducer;
