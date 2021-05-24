import { all } from "redux-saga/effects";
import signUpSaga from "./registrationSaga/signupSaga";
import signInSaga from "./registrationSaga/signinSaga";
import getAllSaga from "./auctionSaga/getAllSaga";
import getProductsSaga from "./productSagas/getProdutctsSaga";
import getProductSaga from "./productSagas/getProdutctSaga";
import getOneSaga from "./auctionSaga/getOneSaga";
import ordersSaga from "./ordersSaga/ordersSaga";
import productsSaga from "./productsSaga/productsSaga";
import profileSaga from "./profileSaga/profileSaga";
import myAuctionsSaga from "./myAuctionsSaga/myAuctionsSaga";

export default function* rootSaga() {
    yield all([
        signUpSaga(),
        signInSaga(),
        getAllSaga(),
        getOneSaga(),
        getProductsSaga(),
        getProductSaga(),
        ordersSaga(),
        productsSaga(),
        profileSaga(),
        myAuctionsSaga()
    ]);
}
