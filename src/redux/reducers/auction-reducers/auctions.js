import {
    GET_ALL_AUCTION_REQ,
    GET_ALL_AUCTION_SUCCESS,
    GET_ALL_AUCTION_FAILED,
    GET_ONE_AUCTION_REQ,
    GET_ONE_AUCTION_SUCCESS,
    GET_ONE_AUCTION_FAILED,
    AUCTION_CLEAR, AUCTION_ADD_BID
} from "../../constants/auctions";
// import {PRODUCT_CLEAR} from "../../constants/product";

const initialState = {
    auctions: [],
    auction: null,
    error: '',
    loading: false
};

const auctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_AUCTION_REQ:
            console.log('auctionReducer req')
            return {...state, loading: false}
        case GET_ALL_AUCTION_SUCCESS:
            console.log('auctionReducer success')
            return {
                ...state,
                loading: false,
                auctions: action.payload
            }
        case GET_ALL_AUCTION_FAILED:
            console.log('auctionReducer failed')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case AUCTION_CLEAR:
            return {
                ...state,
                auction: null,
            };
        case GET_ONE_AUCTION_REQ:
            return {
                ...state,
                loading: true,
            };
        case GET_ONE_AUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                auction: action.payload,
            };
        case GET_ONE_AUCTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case AUCTION_ADD_BID:
            return {
                ...state,
                auction: {...state.auction, bids: [action.payload,...state.auction.bids] },
            };
        default:
            return state;
    }
};

export default auctionReducer;
