import { FETCH_MY_AUCTIONS, CREATE_AUCTION } from '../constants/myAuctions'

export const fetchAuctions = function () {

    return {
        type:FETCH_MY_AUCTIONS,
    };
};

export const createAuction = function (newProduct, history, clearForm) {

    return {
        type:CREATE_AUCTION,
        payload: {
            newProduct,
            history,
            clearForm
        }
    };
};