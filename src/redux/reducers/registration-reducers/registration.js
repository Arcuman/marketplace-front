import {SIGN_UP_REQ, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_IN_REQ, LOG_IN_SUCCESS,LOG_IN_FAIL} from "../../constants/types";

const initialState = {
    authToken: '',
    user: {},
    errorLogIn: '',
    errorSignUp: '',
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
                authToken: action.payload,
                errorSignUp: ''
            }
        case SIGN_UP_FAIL:
            return {
                loading: false,
                errorSignUp: action.payload
            }
        case LOG_IN_REQ:
            return {
                loading: true
            };
        case LOG_IN_SUCCESS:
            return {
                loading: false,
                authToken: action.payload,
                errorLogIn: ''
            }
        case LOG_IN_FAIL:
            return {
                loading: false,
                errorLogIn: action.payload
            }
        default:
            return state;
    }
};

export default registrationReducer;
