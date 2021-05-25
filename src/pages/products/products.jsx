import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productsActions';
import { createStyles, makeStyles, Button } from '@material-ui/core';
import { useEffect } from 'react';

import {BASE_URL} from '../../constants/constants'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
	createStyles({
        card:{
            width: '80%',
            padding: '40px',
            boxSizing: 'border-box',
            boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            backgroundColor: 'rgba(50, 50, 50, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: '0 auto'
        },
        cardHeader: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardItemsContainer: {
            width: '100%',
            display: 'flex',
            marginTop: '20px',
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
            marginRight: '10px',
            maxHeight: '180px'
        },
        cardItemInfo: {
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
        },
        cardItemName: {
            color: 'blue', 
            fontWeight: 500, 
            marginBottom: '20px'
        },
        cardItemQuantity: {
            color: 'gray', 
            fontWeight: 500
        },
        cardItemButtons: {
            display: 'flex',
            '&:hover':{
                cursor: 'pointer',
                boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            }
        },
        cardItemButtonsEdit: {
            color: 'blue', 
            marginRight: '10px',

        }
    })
)


export default function Products(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((store) => store.userProducts.products);
    const history = useHistory();
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [ dispatch])

    return (
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <h3>Продукты</h3>
                <Button variant="contained" color='primary' onClick={() => history.push('/new-product')}>+ НОВЫЙ ПРОДУКТ</Button>
            </div>
            {products && !products.length && <h1 style={{margin: '40px'}}>Нету продуктов</h1>}
            <div className={classes.cardItemsContainer}>
                {products.map(product => (
                    <div key={product.id} className={classes.cardItem}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img  className={classes.cardItemImg} src={`${BASE_URL}${product.photo}`} alt=''/>
                            <div className={classes.cardItemInfo}>
                                <span className={classes.cardItemName}>{product.name}</span>
                                <span className={classes.cardItemQuantity}>Количество: {product.quantity} | Цена: ${product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
