// import H from "history";
import {
    GET_ALL_AUCTION_REQ,
    GET_ALL_AUCTION_SUCCESS,
    GET_ALL_AUCTION_FAILED,
    GET_ONE_AUCTION_REQ, GET_ONE_AUCTION_SUCCESS, AUCTION_ADD_BID
} from '../constants/auctions'
import {AUCTION_CLEAR} from "../constants/auctions";


export const getAllAuctions = function () {
    return {
        type: GET_ALL_AUCTION_REQ,
    }
}

export const getAllAuctionSuccess = function (auctions) {
    return {
        type: GET_ALL_AUCTION_SUCCESS,
        payload: auctions,
    };
};

export const getAllAuctionFail = function (error) {

    return {
        type: GET_ALL_AUCTION_FAILED,
        payload: error,
    };
};


export const auctionClear = function (auctionId) {

    return {
        type: AUCTION_CLEAR,
    };
};

export const auctionReq = function (auctionId) {
    return {
        type: GET_ONE_AUCTION_REQ,
        payload: auctionId
    };
};

export const auctionReqSuccess = function (auction) {
    return {
        type: GET_ONE_AUCTION_SUCCESS,
        payload: auction
    };
};

export const auctionReqFail = function (errorMessage) {
    return {
        type: GET_ALL_AUCTION_FAILED,
        payload: errorMessage
    };
};

export const auctionAddBid = function (bid) {
    return {
        type: AUCTION_ADD_BID,
        payload: bid
    };
};

