import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {GET_ALL_AUCTION_REQ, GET_ALL_AUCTION_SUCCESS, GET_ALL_AUCTION_FAILED} from '../../constants/auctions'
import {BASE_URL} from "../../../constants/constants";

export function* getAllSaga(action) {
    try {
        const res = yield axios.get(`${BASE_URL}api/auctions`)
            .then(res => res)
        console.log(res);
        yield put({
            type: GET_ALL_AUCTION_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_ALL_AUCTION_FAILED,
            payload: e.response.data.message
        })
    }
}

function* watchGetAllSaga() {
    yield takeEvery(GET_ALL_AUCTION_REQ, getAllSaga);
}

export default watchGetAllSaga;
