import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {LOG_IN_REQ, LOG_IN_SUCCESS,LOG_IN_FAIL} from '../../constants/types'

export function* signInSaga(action) {
    try {
        const res = yield axios.post('https://afternoon-waters-64991.herokuapp.com/api/auth/login', {
            password: action.payload.formValue.password,
            username: action.payload.formValue.email
        }).then(res => res)
        
        localStorage.setItem('token', res.data.access_token);

        yield put({
            type: LOG_IN_SUCCESS,
            payload: res.data.access_token
        })

        action.payload.clearForm();

        action.payload.history.push("/catalog")

    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAIL,
            payload: e.response.data.message
        })
        // yield put({
        //     type: type.GET_USERS_FAILED,
        //     message: e.response.data.error,
        // });
    }
}

function* watchSignInSaga() {
    yield takeEvery(LOG_IN_REQ, signInSaga);
}

export default watchSignInSaga;
