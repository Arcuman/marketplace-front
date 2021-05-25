// import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addQuantityToBasket, removeFromBasket } from '../../redux/actions/basketAction';
import { createStyles, makeStyles, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import BasketCheckout from '../../components/basket-checkout/basketCheckout'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
	createStyles({
        root:{
            width: "100%",
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex', 
            justifyContent: 'space-between'
        },
        card:{
            width: '50%',
            padding: '40px',
            boxSizing: 'border-box',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            backgroundColor: 'rgba(50, 50, 50, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        cardTitle: {

        },
        cardItemsContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        cardItem: {
            width: '100%',
            padding: '20px 40px',
            boxSizing: 'border-box',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.1)',
            marginBottom: '2px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
        },
        cardItemImg: {
            width: '30%',
            objectFit: 'contain',
            maxHeight: '200px',
            marginRight: '20px'
        },
        cardItemInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        cardItemInfoName:{
            color: 'blue',
            fontWeight: 500,
            marginBottom: '15px'
        },
        cardItemInfoText:{
            color: 'gray',
        },
        cardItemInfoBlue:{
            color: 'blue',
            fontWeight: 500
        },
        cardItemInfoInput: {
            maxWidth: '65px',
            padding: '2px 10px',
            marginRight: '10px',
            marginLeft: '5px',
            border: 'none',
            borderBottom: '1px solid black',
            outline: 'none'
        },
        cardInfoRemove: {
            '&:hover': {
                cursor: "pointer",
                color: 'red',
             },
        },
        cardItemCost:{
            color: 'gray',
            fontWeight: 500,
            fontSize: "20px"
        },
        cardFooter: {
            width: '100%',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        cardFooterTotal: {
            fontSize: '16px',
            fontWeight: 600,
            whiteSpace: 'nowrap'
        },
        cardFooterButtons: {
            marginLeft: '10px',
            display: 'flex',
            alignItems: 'flex-end'
        },
        cardFooterButton: {
            marginRight: '10px',
        },

    })
);

export default function Bakset(){
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isShowCheckout, setIsShowCheckout] =  useState(false);
    const basket = useSelector((store) => store.basket.basket);

    useEffect(() => {
        if(basket.length){
            const totalPrice = basket.reduce(function (accumulator, product) {
                return accumulator + product.cost;
            }, 0);

            const totalQuantity = basket.reduce(function (accumulator, product) {
                return accumulator + product.quantity;
            }, 0);
    
            setTotal(totalPrice);
            setTotalQuantity(totalQuantity);
        }

        if(!basket.length){
            setIsShowCheckout(false);
            setTotal(0);
        }
    }, [basket]);

    function toggleShowCheckout(){
        setIsShowCheckout(!isShowCheckout);
    }

    function onChangProductQuantity(e, product){
        dispatch(addQuantityToBasket(product, Number(e.target.value)));
    }

    function removeFromStoreBasket(productId){
        dispatch(removeFromBasket(productId));
    }

    return (
        <div className={classes.root}>
            <div className={classes.card}>
                <h3>Магазин покупок</h3>
                <div className={classes.cardItemsContainer}>
                {basket.map(product => (
                    <div key={product.id} className={classes.cardItem}>
                        <div style={{display: 'flex'}}>
                            <img className={classes.cardItemImg} src={`http://afternoon-waters-64991.herokuapp.com/${product.photo}`} alt=''/>
                            <div className={classes.cardItemInfo}>
                                <span className={classes.cardItemInfoBlue}>{product.name}</span>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span className={classes.cardItemInfoText}>$ {product.price}</span>
                                    <span className={classes.cardItemInfoText}>Магазин: asmnd</span>
                                </div>
                                <div>
                                    <span className={classes.cardItemInfoText}>Количество:</span>
                                    <input className={classes.cardItemInfoInput} min='1' type='number' value={product.quantity} onChange={(e) => onChangProductQuantity(e, product)}/>
                                    <span className={`${classes.cardItemInfoBlue} ${classes.cardInfoRemove}`} onClick={() => removeFromStoreBasket(product.id)}>X УДАЛИТЬ</span>
                                </div>
                            </div>
                        </div>
                        <span className={classes.cardItemCost}>${product.cost}</span>
                    </div>
                ))}
                </div>
                <div className={classes.cardFooter}>
                   <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className={classes.cardFooterTotal}>Общая сумма: ${total}</span>
                    <span className={classes.cardFooterTotal}>Общее количество: {totalQuantity}</span>
                   </div>
                    <div className={classes.cardFooterButtons}>
                        {localStorage.getItem('token') && (!isShowCheckout && ( <Button variant="contained" color="secondary" disabled={!basket || !basket.length} onClick={toggleShowCheckout} className={classes.cardFooterButton}>
                            Покупка
                        </Button>))}
                        {!localStorage.getItem('token') && <Button variant="contained" color="secondary" onClick={() => history.push('log-in')} className={classes.cardFooterButton}>
                            Авторизироваться для покупки
                        </Button>}
                        <Button variant="contained" onClick={() => history.push('/catalog')}>
                            Продолжить покупки
                        </Button>
                    </div>
                </div>
            </div>
            {isShowCheckout && <BasketCheckout toggleShowCheckout={toggleShowCheckout}/>}
        </div>
    )
}
