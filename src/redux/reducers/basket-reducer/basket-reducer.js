import { ADD_TO_BASKET, REMOVE_FROM_BASKET, ADD_QUANTITY_TO_BASKET, CLEAR_BASKET} from '../../constants/basket'

const initialState = {
    basket: [],
};

const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            const newBasket = state.basket ? state.basket.concat() : [];

            if(newBasket.length){
                const isProduct = newBasket.some(product => product.id === action.payload.id);
                console.log(isProduct);
                if(isProduct){
                    newBasket.forEach(product => {
                        if(product.id === action.payload.id){
                            product.quantity++;
                            product.cost += action.payload.price;
                        }
                    })
                }

                if(!isProduct){
                    newBasket.push({
                        ...action.payload,
                        quantity: 1,
                        cost: action.payload.price
                    })
                }
               
            }

            if(!newBasket.length){
                newBasket.push({
                    ...action.payload,
                    quantity: 1,
                    cost: action.payload.price
                })
            }
            console.log(newBasket);
            return {
                basket: newBasket
            }
        case REMOVE_FROM_BASKET:
            const newRemovedBasket = state.basket.filter(product => {
                return product.id !== action.payload;
            });
            return {
                basket: newRemovedBasket,
            };
        case CLEAR_BASKET:
            return {
                basket: [],
            };
        case ADD_QUANTITY_TO_BASKET:
            const newQuantityBasket = state.basket.concat();
            
            newQuantityBasket.forEach(product => {
                                   if(product.id === action.payload.product.id){
                                       product.quantity = action.payload.quantity;
                                       product.cost = action.payload.product.price * action.payload.quantity;
                                   }
                               })
            return {
                basket: newQuantityBasket
            };
        default:
            return state;
    }
};

export default basketReducer;
