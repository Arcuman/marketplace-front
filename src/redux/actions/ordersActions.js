import { SEND_ORDER, FETCH_ORDERS, FETCH_ORDER } from '../constants/orders'

export const sendOrder = function (order) {

    return {
        type: SEND_ORDER,
        payload: order
    };
};

export const fetchOrders = function () {

    return {
        type: FETCH_ORDERS,
    };
};

export const fetchOrder = function (orderId) {
    return {
        type: FETCH_ORDER,
        payload:orderId
    }
}