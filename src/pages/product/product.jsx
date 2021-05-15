import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToBasket } from '../../redux/actions/basketAction';
import { createStyles, makeStyles } from '@material-ui/core';
import { productReq, productClear } from '../../redux/actions/productAction';
import { ShoppingBasketOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
	createStyles({
        loading: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
        },
        root: {
            width: '60%',
            maxWidth: '450px',
            margin: '0 auto',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.15)',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        cardHead: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        cardHeadTitle: {
            fontSize: '15px',
            fontWeight: '500'
        },
        cardHeadBasket: {
            color: 'rgb(230,0,0)',
            backgroundColor: 'rgba(0,0,0, 0.55)',
            marginRight: '20px',
            padding: '10px',
            borderRadius: '3px',
            '&:hover': {
                cursor: "pointer",
                color: 'red',
                backgroundColor: 'rgba(0,0,0, 0.35)',
             },
        },
        cardImg: {
            width: '100%',
            objectFit: 'cover',
            marginTop: '20px',
        },
        cardBottom: {
            width: '100%',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        cardBottomDescr: {
            maxWidth: '50%'
        },
        cardBottomPrice: {
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(0,0,0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        cardBottomPriceText: {
            fontSize: '18px'
        }
    })
)

export default function Product(){
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeProduct = useSelector((store) => store.products.product);
    
    useEffect(() => {
        if(!storeProduct){
            dispatch(productReq(params.id))
        }

        if(storeProduct && storeProduct.id !== +params.id){
            dispatch(productClear());
            dispatch(productReq(params.id))
        }
    }, [dispatch, params, storeProduct]);

    function addProductToBasket(e,product){
        e.stopPropagation();
        dispatch(addToBasket(product));
    }

    return (
        <div>
            {!storeProduct && (
             <div className={classes.loading}><h1>Loading...</h1></div>
            )}
            {storeProduct && (
                <div className={classes.root}>
                    <div className={classes.cardHead}>
                        <span className={classes.cardHeadTitle}>
                            {storeProduct.name}
                        </span>
                        <ShoppingBasketOutlined className={classes.cardHeadBasket} onClick={(e) => addProductToBasket(e, storeProduct)}/>
                    </div>
                    <img src={`http://afternoon-waters-64991.herokuapp.com/${storeProduct.photo}`} alt='' className={classes.cardImg}/>
                    <div className={classes.cardBottom}>
                        <p className={classes.cardBottomDescr}>
                            {storeProduct.description}
                        </p>
                        <div className={classes.cardBottomPrice}>
                            <span className={classes.cardBottomPriceText}>$ {storeProduct.price}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}