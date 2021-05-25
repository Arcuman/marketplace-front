import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productsReq } from '../../redux/actions/productAction';
import { addToBasket } from '../../redux/actions/basketAction';
import { createStyles, Input, makeStyles } from '@material-ui/core';
import { ShoppingBasketOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
	createStyles({
        mainRoot: {
            width: '95%',
            margin: '0 auto',
            marginTop: '20px',
        },
        searchContainer: {
            width: '100%',
            height: '100px',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.15)',
            backgroundColor: '#e6e6fa'
        },
        root: {
            width: '100%',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.3)',
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '20px'
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
            maxHeight: '180px',
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
        input: {
            width: '30%',
            padding: '5px',
            height: '40px'
        }
    })
)

export default function Catalog(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const [localProducts, setLocalProducts] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if(!localProducts || localProducts.length === 0){
            dispatch(productsReq());
        }
    }, [dispatch, products, localProducts])

    useEffect(() => {
        setLocalProducts(products);
    }, [products])

    function addProductToBasket(e,product){
        e.stopPropagation();
        if(product.quantity < 1)
            return
        const newProducts = localProducts.map(localProduct => {
            if (localProduct.id === product.id){
                localProduct.quantity--;
            }
            return localProduct
        })
        setLocalProducts(newProducts)
        dispatch(addToBasket(product));
    }

    function searchProduct(e){
        if(e.target.value){
            const newProducts = products.filter(product => {
                if (product.name.startsWith(e.target.value)){
                    return true;
                } else {
                    return false;
                }
            })
            setLocalProducts(newProducts)
        } 
        if(!e.target.value){
            setLocalProducts(products);
        }

    }

    return (
        <div  className={classes.mainRoot}>
            <div  className={classes.searchContainer}>
                <Input className={classes.input} onChange={searchProduct} type='text' placeholder="Найти продукты"/>
            </div>
            <div className={classes.root}>
            {!localProducts && <h1 style={{margin: '40px'}}>Загрузка...</h1>}
            {localProducts && !localProducts.length && <h1 style={{margin: '40px'}}>Нету продуктов</h1> }
            {localProducts && localProducts.map(product => 
                <div className={classes.productCard}  key={product.id} onClick={() => history.push(`/product/${product.id}`)}>
                    <img className={classes.productImg} src={`http://afternoon-waters-64991.herokuapp.com/${product.photo}`} alt='cardPhoto'/>
                    <div className={classes.bottomLine}>
                        <div className={classes.bottomLineInfo}>
                            <span className={classes.bottomLineText}>{product.name}</span>
                            <span className={classes.bottomLineText}>$ {product.price}</span>
                            <span className={classes.bottomLineText}>Кол-во: {product.quantity}</span>
                        </div>
                        <ShoppingBasketOutlined onClick={(e) => addProductToBasket(e, product)}  className={classes.bottomLineBasket}/>
                    </div>
                </div>
            )}
        </div>
        </div>

    )
}
