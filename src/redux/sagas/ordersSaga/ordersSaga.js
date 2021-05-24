import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import { SEND_ORDER, SEND_ORDER_SUCCESS, SEND_ORDER_FAIL, FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_ORDER, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from '../../constants/orders'
import { CLEAR_BASKET } from '../../constants/basket'
import {BASE_URL} from "../../../constants/constants";

export function* createOrderSaga(action) {
    try {
        const newBasketArr = [];

        action.payload.basket.forEach(product => {
            newBasketArr.push({productId: product.id, quantity: product.quantity})
        })
        const sendObject = {
            ...action.payload.formValue,
            orderItems: newBasketArr
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.post(`${BASE_URL}api/orders`, sendObject, 
        {
            headers: headers
        }).then(res => res)

        yield put({
            type: SEND_ORDER_SUCCESS,
            payload: res.data
        })
        yield put({
            type: CLEAR_BASKET,
        })
        action.payload.clearForm();
        action.payload.toggleShowCheckout();
        
    } catch (e) {
        console.log(e);
        yield put({
            type: SEND_ORDER_FAIL,
            payload: e.response.data.message
        })
    }
}

export function* fetchOrdersSaga(action) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.get(`${BASE_URL}api/users/orders`,
        {
            headers: headers
        }).then(res => res)
        
        yield put({
            type: FETCH_ORDERS_SUCCESS,
            payload: res.data
        })
        
    } catch (e) {
        console.log(e);
        yield put({
            type: FETCH_ORDERS_FAIL,
            payload: e.response.data.message
        })
    }
}

export function* fetchOrderSaga(action) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.get(`${BASE_URL}api/orders/${action.payload}`,
        {
            headers: headers
        }).then(res => res)

        yield put({
            type: FETCH_ORDER_SUCCESS,
            payload: res.data
        })
        
    } catch (e) {
        console.log(e);
        yield put({
            type: FETCH_ORDER_FAIL,
            payload: e.response.data.message
        })
    }
}

function* watchGetAllSaga() {
    yield takeEvery(SEND_ORDER, createOrderSaga);
    yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
    yield takeEvery(FETCH_ORDER, fetchOrderSaga);
}

export default watchGetAllSaga;
