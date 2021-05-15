// import H from "history";
import {SIGN_UP_REQ, SIGN_UP_FAIL, SIGN_UP_SUCCESS, LOG_IN_REQ} from '../constants/types'

export const signUpReq = function (formValue) {

    return {
        type:SIGN_UP_REQ,
        payload: formValue
    };
};

export const logInReq = function (formValue) {
    return {
        type: LOG_IN_REQ,
        payload: formValue
    }
}

export const signUpSuccess = function (authToken) {

    return {
        type:SIGN_UP_SUCCESS,
        payload: authToken,
    };
};

export const signUpFail = function (error) {

    return {
        type:SIGN_UP_FAIL,
        payload: error,
    };
};

