import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/actions/ordersActions';
import { createStyles, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
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
            flexDirection: 'column',
           
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
            '&:hover':{
                cursor: 'pointer',
                boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            }
        },
        cardItemMain:{
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-around'
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
        cardItemDate: {

        },
        cardItemTotal: {

        },
        text: {
            fontWeight: 500,
            color: 'gray'
        }
    })
)


export default function Products(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.orders.orders);
    const history = useHistory();
    
    useEffect(() => {
        dispatch(fetchOrders());
    }, [ dispatch])


    function transformDate(date){
        const newDate = new Date(date);
        const month = newDate.getMonth() >= 10 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1)

        return `${newDate.getDate()}/${month}/${newDate.getFullYear()}`
    }

    return (
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <h3>Покупки</h3>
            </div>
            {orders && !orders.length && <h1 style={{margin: '40px'}}>Нету заказов</h1>}
            <div className={classes.cardItemsContainer} >
                {orders.map(order => (
                    <div key={order.id} className={classes.cardItem} onClick={() => history.push(`/order-details/${order.id}`)}>
                        <div className={classes.cardItemMain} >
                            <div className={classes.cardItemDate}>
                                <span className={classes.text}>Дата покупки: {transformDate(order.orderDate)}</span>
                            </div>
                            <div className={classes.cardItemInfo}>
                                <span className={classes.text}>Адрес: {order.country}, {order.city}, {order.address}</span>
                                <span className={classes.text}>Телефон: {order.phone}</span>
                            </div>
                        </div>
                        <div className={classes.cardItemTotal}>
                            <span className={classes.text}>Сумма заказа: $ {order.totalSum}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}