import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL} from '../../constants/profile'
import {BASE_URL} from "../../../constants/constants";

export function* profileSaga(action) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.get(`${BASE_URL}api/users/profile`,
        {
            headers: headers
        }).then(res => res)

        yield put({
            type: FETCH_PROFILE_SUCCESS,
            payload: res.data
        })

    } catch (e) {
        console.log(e);
        yield put({
            type: FETCH_PROFILE_FAIL,
            payload: e.response.data.message
        })

    }
}

export function* updateProfileSaga(action) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
          
        const res = yield axios.put(`${BASE_URL}api/users/profile`, action.payload.formData,
        {
            headers: headers
        }).then(res => res)

        yield put({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.data
        })

        yield put({
            type: FETCH_PROFILE,
        })

        action.payload.clearForm();

    } catch (e) {
        console.log(e);
        yield put({
            type: UPDATE_PROFILE_FAIL,
            payload: e.response.data.message
        })

    }
}

function* watchSignInSaga() {
    yield takeEvery(FETCH_PROFILE, profileSaga);
    yield takeEvery(UPDATE_PROFILE, updateProfileSaga);
}

export default watchSignInSaga;
