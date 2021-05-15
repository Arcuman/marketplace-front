import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {PRODUCTS_REQ, PRODUCTS_REQ_SUCCESS, PRODUCTS_REQ_FAIL} from '../../constants/product'

export function* getProductsSaga(action) {
    try {
        const products = yield axios.get('https://afternoon-waters-64991.herokuapp.com/api/products').then(products => products)
        console.log(products.data);

        yield put({
            type: PRODUCTS_REQ_SUCCESS,
            payload: products.data
        })


    } catch (e) {
        console.log(e);
        yield put({
            type: PRODUCTS_REQ_FAIL,
            payload: e.response.data.message
        })
    }
}

function* watchSignInSaga() {
    yield takeEvery(PRODUCTS_REQ, getProductsSaga);
}

export default watchSignInSaga;
