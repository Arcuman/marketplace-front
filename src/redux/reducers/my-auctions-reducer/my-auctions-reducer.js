import {  FETCH_MY_AUCTIONS_SUCCESS, FETCH_MY_AUCTIONS_FAIL, CREATE_AUCTION_SUCCESS, CREATE_AUCTION_FAIL} from '../../constants/myAuctions'

const initialState = {
    auctions: [],
    errorMessage: ''
};

const myAuctionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MY_AUCTIONS_SUCCESS:
            return {
                ...state,
                auctions: action.payload.concat(),
                errorMessage: ''
            };
        case FETCH_MY_AUCTIONS_FAIL:
            return {
                ...state,
                errorMessage:  action.payload,
            };
        case CREATE_AUCTION_SUCCESS:
            return {
                ...state,
                errorMessage: ''
            };
        case CREATE_AUCTION_FAIL:
            return {
                ...state,
                errorMessage:  action.payload,
            };
        default:
            return state;
    }
};

export default myAuctionsReducer;
