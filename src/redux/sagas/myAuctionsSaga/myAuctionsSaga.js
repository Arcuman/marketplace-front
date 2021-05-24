import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import { FETCH_MY_AUCTIONS, FETCH_MY_AUCTIONS_SUCCESS, FETCH_MY_AUCTIONS_FAIL, CREATE_AUCTION, CREATE_AUCTION_SUCCESS, CREATE_AUCTION_FAIL} from '../../constants/myAuctions'
import {BASE_URL} from "../../../constants/constants";

export function* auctionsSaga() {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.get(`${BASE_URL}api/users/auctions`,
        {
            headers: headers
        }).then(res => res)

        yield put({
            type: FETCH_MY_AUCTIONS_SUCCESS,
            payload: res.data
        })
        
    } catch (e) {
        console.log(e);
        yield put({
            type: FETCH_MY_AUCTIONS_FAIL,
            payload: e.response.data.message
        })
    }
}

export function* createAuctionSaga(action) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        console.log(action.payload.newProduct)
        console.log(action.payload)
        const res = yield axios.post(`${BASE_URL}api/auctions`, action.payload.newProduct,
        {
            headers: headers
        }).then(res => res)

        console.log(res)
        yield put({
            type: CREATE_AUCTION_SUCCESS,
            payload: res.data
        })
        action.payload.clearForm();
        action.payload.history.push('/my-auctions')
        
    } catch (e) {
        console.log(e);
        yield put({
            type: CREATE_AUCTION_FAIL,
            payload: e.response.data.message
        })
    }
}

function* watchGetAllSaga() {
    yield takeEvery(FETCH_MY_AUCTIONS, auctionsSaga);
    yield takeEvery(CREATE_AUCTION, createAuctionSaga);
}

export default watchGetAllSaga;
