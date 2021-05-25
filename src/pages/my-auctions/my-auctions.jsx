import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Button } from '@material-ui/core';
import { useEffect } from 'react';

import {BASE_URL} from '../../constants/constants'
import { useHistory } from 'react-router';
import { fetchAuctions } from '../../redux/actions/myAuctions';
import ViewIcon from "@material-ui/icons/Visibility";

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
            '&:hover':{
                cursor: 'pointer',
                boxShadow: '0px 10px 8px 0px rgba(50, 50, 50, 0.25)',
            }
        },
        cardItemImg: {
            width: '30%',
            objectFit: 'contain',
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
            display: 'flex'
        },
        cardItemButtonsEdit: {
            color: 'blue', 
            marginRight: '10px'
        }
    })
)


export default function MyAuctions(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const auctions = useSelector((store) => store.myAuctions.auctions);
    const history = useHistory();
    
    useEffect(() => {
        dispatch(fetchAuctions());
    }, [ dispatch])

    function transformDate(date){
        const newDate = new Date(date);
        const month = newDate.getMonth() >= 10 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1)

        return `${newDate.getDate()}/${month}/${newDate.getFullYear()}`
    }
    return (
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <h3>Аукционы</h3>
                <Button variant="contained" color='primary' onClick={() => history.push('/new-auction')}>+ НОВЫЙ АУКЦИОН</Button>
            </div>
            {auctions && !auctions.length && <h1 style={{margin: '40px'}}>Нету аукционов</h1>}
            <div className={classes.cardItemsContainer}>
                {auctions.map(auction => (
                    <div key={auction.id} className={classes.cardItem} onClick={() => history.push(`/auctions/${auction.id}`)}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img  className={classes.cardItemImg} src={`${BASE_URL}${auction.photo}`} alt=''/>
                            <div className={classes.cardItemInfo}>
                                <span className={classes.cardItemName}>{auction.name}</span>
                                <span className={classes.cardItemQuantity}>Цена: $ {auction.price}</span>
                                <span className={classes.cardItemQuantity}> Начало: {transformDate(auction.bidStart)}</span>
                                <span className={classes.cardItemQuantity}> Конец: {transformDate(auction.bidEnd)}</span>
                            </div>
                        </div>
                        <div className={classes.cardItemButtons}>
                            <ViewIcon className={classes.cardItemButtonsEdit}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
