import { FETCH_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE_ERROR} from '../constants/profile';

export function fetchProfile(){
    return {
        type: FETCH_PROFILE
    }
}

export function clearProfilError(){
    return {
        type: CLEAR_PROFILE_ERROR
    }
}

export function updateProfile(formData, history, clearForm){
    return {
        type: UPDATE_PROFILE,
        payload: {
            formData, history, clearForm
        }

    }
}