import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {GET_ONE_AUCTION_REQ, GET_ONE_AUCTION_SUCCESS, GET_ONE_AUCTION_FAILED} from '../../constants/auctions'
import {BASE_URL} from "../../../constants/constants";

export function* getOneSaga(action) {
        console.log(action)
        const auctionId = action.payload;
    try {
        const res = yield axios.get(`${BASE_URL}api/auctions/${auctionId}`)
            .then(res => res)

        yield put({
            type: GET_ONE_AUCTION_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        console.log(e);
        yield put({
            type: GET_ONE_AUCTION_FAILED,
            payload: e.response.data.message
        })
    }
}

function* watchGetAllSaga() {
    yield takeEvery(GET_ONE_AUCTION_REQ, getOneSaga);
}

export default watchGetAllSaga;
