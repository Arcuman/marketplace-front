import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {SIGN_UP_REQ, SIGN_UP_SUCCESS, SIGN_UP_FAIL} from '../../constants/types'
import {BASE_URL} from "../../../constants/constants";

export function* signUpSaga(action) {
    console.log(action)
    try {
        const res = yield axios.post(`${BASE_URL}api/auth/registration`, action.payload.formValue).then(res => res)
        
        localStorage.setItem('token', res.data.access_token);

        yield put({
            type: SIGN_UP_SUCCESS,
            payload: res.data.access_token
        })

        action.payload.clearForm();

        action.payload.history.push("/catalog")

    } catch (e) {
        console.log(e.response.data);
        yield put({
            type: SIGN_UP_FAIL,
            payload: e.response.data.message
        })
        // yield put({
        //     type: type.GET_USERS_FAILED,
        //     message: e.response.data.error,
        // });
    }
}

function* watchSignInSaga() {
    yield takeEvery(SIGN_UP_REQ, signUpSaga);
}

export default watchSignInSaga;
