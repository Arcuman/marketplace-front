import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productsReq } from '../../redux/actions/productAction';
import { addToBasket } from '../../redux/actions/basketAction';
import { createStyles, makeStyles } from '@material-ui/core';
import { ShoppingBasketOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
	createStyles({
        root: {
            width: '95%',
            margin: '0 auto',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.3)',
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            
        },
        productCard: {
            width: '300px',
            height: '300px',
            position: 'relative',
            margin: '30px',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.15)',
            '&:hover': {
                cursor: "pointer",
                boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.3)',
             },
        },
        productImg: {
            width: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            zIndex: 1
        },
        bottomLine: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0, 0.55)',
            padding: '20px 0',
            zIndex: 2
        },
        bottomLineInfo: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: '20px'
        },
        bottomLineBasket: {
            color: 'rgb(230,0,0)',
            marginRight: '20px',
            '&:hover': {
                cursor: "pointer",
                color: 'red',
             },
        },
        bottomLineText: {
            color: '#ffffff'
        },
    })
)

export default function Catalog(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const history = useHistory();

    useEffect(() => {
        if(!products){
            dispatch(productsReq());
        }
    }, [dispatch, products])

    useEffect(() => {
        console.log(products)
    }, [products])

    function addProductToBasket(e,product){
        e.stopPropagation();
        dispatch(addToBasket(product));
    }

    return (
        <div className={classes.root}>
            {!products && <h1>Loading...</h1>}
            {products && products.map(product => 
                <div className={classes.productCard}  key={product.id} onClick={() => history.push(`/product/${product.id}`)}>
                    <img className={classes.productImg} src={`http://afternoon-waters-64991.herokuapp.com/${product.photo}`} alt='cardPhoto'/>
                    <div className={classes.bottomLine}>
                        <div className={classes.bottomLineInfo}>
                            <span className={classes.bottomLineText}>{product.name}</span>
                            <span className={classes.bottomLineText}>$ {product.price}</span>
                        </div>
                        <ShoppingBasketOutlined onClick={(e) => addProductToBasket(e, product)}  className={classes.bottomLineBasket}/>
                    </div>
                </div>
            )}
        </div>

    )
}