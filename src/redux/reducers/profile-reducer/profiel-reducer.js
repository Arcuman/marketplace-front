import {FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, CLEAR_PROFILE_ERROR} from '../../constants/profile'
const initialState = {
    loader: false,
    profileData: null,
    errorMessage: ''
};

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_SUCCESS: 
            return {
                ...state,
                profileData: action.payload
            };
        case FETCH_PROFILE_FAIL: 
            return {
                ...state,
                errorMessage: action.payload
            }
        case UPDATE_PROFILE_SUCCESS: 
            return {
                ...state,
                errorMessage: ''
            };
        case UPDATE_PROFILE_FAIL: 
            return {
                ...state,
                errorMessage: action.payload
            }
        case CLEAR_PROFILE_ERROR: 
            return {
                ...state,
                errorMessage: ''
            }
        default:
            return state;
    }
};

export default loaderReducer;
