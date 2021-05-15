import {SIGN_UP_REQ, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_IN_REQ, LOG_IN_SUCCESS,LOG_IN_FAIL} from "../../constants/types";

const initialState = {
    authToken: '',
    user: {},
    error: '',
    loading: false
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_REQ:
            return {
                loading: true
            };
        case SIGN_UP_SUCCESS:
            
            return {
                loading: false,
                authToken: action.payload
            }
        case SIGN_UP_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case LOG_IN_REQ:
            return {
                loading: true
            };
        case LOG_IN_SUCCESS:
            return {
                loading: false,
                authToken: action.payload
            }
        case LOG_IN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export default registrationReducer;
