import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL} from '../../constants/products'

const initialState = {
    products: [],
    errorMessage: ''
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                errorMessage: ''
            };
        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                errorMessage:  action.payload,
            };
        case CREATE_PRODUCT_SUCCESS:
            const newProducts = state.products.concat();
            newProducts.push(action.payload);

            return {
                ...state,
                products: newProducts,
                errorMessage: ''
            };
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                errorMessage:  action.payload,
            };
        default:
            return state;
    }
};

export default productsReducer;
