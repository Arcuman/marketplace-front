import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {PRODUCT_REQ, PRODUCT_REQ_SUCCESS, PRODUCT_REQ_FAIL} from '../../constants/product'

export function* getProductSaga(action) {
    const productId = action.payload;
    try {
        const product = yield axios.get(`https://afternoon-waters-64991.herokuapp.com/api/products/${productId}`).then(products => products)

        yield put({
            type: PRODUCT_REQ_SUCCESS,
            payload: product.data
        })


    } catch (e) {
        console.log(e);
        yield put({
            type: PRODUCT_REQ_FAIL,
            payload: e.response.data.message
        })
    }
}

function* watchSignInSaga() {
    yield takeEvery(PRODUCT_REQ, getProductSaga);
}

export default watchSignInSaga;
