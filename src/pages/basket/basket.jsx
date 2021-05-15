// import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addQuantityToBasket, removeFromBasket } from '../../redux/actions/basketAction';
import { createStyles, makeStyles, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) =>
	createStyles({
        card:{
            width: '80%',
            padding: '40px',
            margin: '10px auto',
            boxSizing: 'border-box',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            backgroundColor: 'rgba(50, 50, 50, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: '20px'
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
            objectFit: 'cover',
            marginRight: '10px'
        },
        cardItemInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
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
            fontWeight: 600
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
    const classes = useStyles();
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const basket = useSelector((store) => store.basket.basket);

    useEffect(() => {
        if(basket){
            const totalPrice = basket.reduce(function (accumulator, product) {
                return accumulator + product.cost;
            }, 0);
    
            setTotal(totalPrice);
        }

        if(!basket){
            setTotal(0);
        }
    }, [basket])

    function onChangProductQuantity(e, product){
        dispatch(addQuantityToBasket(product, Number(e.target.value)));
    }

    function removeFromStoreBasket(productId){
        dispatch(removeFromBasket(productId));
    }

    return (
        <div>
            <div className={classes.card}>
                <h3>Магазин покупок</h3>
                <div className={classes.cardItemsContainer}>
                {basket && basket.map(product => (
                    <div key={product.id} className={classes.cardItem}>
                        <div>
                            <img className={classes.cardItemImg} src={`http://afternoon-waters-64991.herokuapp.com/${product.photo}`} alt=''/>
                            <div className={classes.cardItemInfo}>
                                <span className={classes.cardItemInfoBlue}>{product.name}</span>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span className={classes.cardItemInfoText}>$ {product.price}</span>
                                    <span className={classes.cardItemInfoText}>Shop: asmnd</span>
                                </div>
                                <div>
                                    <span className={classes.cardItemInfoText}>Quantity:</span>
                                    <input className={classes.cardItemInfoInput} min='1' type='number' value={product.quantity} onChange={(e) => onChangProductQuantity(e, product)}/>
                                    <span className={`${classes.cardItemInfoBlue} ${classes.cardInfoRemove}`} onClick={() => removeFromStoreBasket(product.id)}>X REMOVE</span>
                                </div>
                            </div>
                        </div>
                        <span className={classes.cardItemCost}>${product.cost}</span>
                    </div>
                ))}
                </div>
                <div className={classes.cardFooter}>
                    <span className={classes.cardFooterTotal}>Total: ${total}</span>
                    <div className={classes.cardFooterButtons}>
                        <Button variant="contained" color="secondary" className={classes.cardFooterButton}>
                            checkout
                        </Button>
                        <Button variant="contained">
                            Continue shopping
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}