import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {auctionReq, auctionClear, auctionAddBid} from "../../redux/actions/auctionsAction";
import {useParams} from "react-router";
import {Card, CardHeader, CardMedia, Grid, Link, Typography} from "@material-ui/core";
import {BASE_URL} from "../../constants/constants";
import Timer from "./Timer";
import {makeStyles} from "@material-ui/core/styles";
import AuctionBid from "./auctionBid";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 60,
    },
    flex: {
        display: 'flex'
    },
    card: {
        padding: '24px 40px 40px'
    },
    subheading: {
        margin: '16px',
        color: theme.palette.openTitle
    },
    description: {
        margin: '16px',
        fontSize: '0.9em',
        color: '#4f4f4f'
    },
    price: {
        padding: '16px',
        margin: '16px 0px',
        display: 'flex',
        backgroundColor: '#93c5ae3d',
        fontSize: '1.3em',
        color: '#375a53',
    },
    media: {
        height: 300,
        display: 'inline-block',
        width: '100%',
    },
    icon: {
        verticalAlign: 'sub'
    },
    link: {
        color: '#3e4c54b3',
        fontSize: '0.9em'
    },
    itemInfo: {
        width: '35%',
        margin: '16px'
    },
    bidSection: {
        margin: '20px',
        minWidth: '50%'
    },
    lastBid: {
        color: '#303030',
        margin: '16px',
    }
}))

const Auction = () => {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    const [justEnded, setJustEnded] = useState(false);
    const storeAuction = useSelector((store) => store.auctions.auction);
    const storeError = useSelector((store) => store.auctions.error);

    useEffect(() => {
        console.log(storeAuction)
        if (!storeAuction) {
            console.log('id' + params.id)
            dispatch(auctionReq(params.id))
        }
        if (storeAuction && storeAuction.id !== +params.id) {
            dispatch(auctionClear());
            dispatch(auctionReq(params.id))
        }
    }, [dispatch, params, storeAuction])

    const updateBids = (bid) => {
        dispatch(auctionAddBid(bid))
    }

    const update = () => {
        setJustEnded(true)
    }

    const currentDate = new Date()
    console.log(storeError);
    return (
        <div className={classes.root}>
            {storeAuction &&
            <Card className={classes.card}>
                <CardHeader
                    title={storeAuction.name}
                    subheader={<span>
                    {currentDate < new Date(storeAuction.bidStart) && 'Аукцион не начался'}
                        {currentDate > new Date(storeAuction.bidStart) && currentDate < new Date(storeAuction.bidEnd) && 'Аукцион идет'}
                        {currentDate > new Date(storeAuction.bidEnd) && 'Аукцион закончился'}
                    </span>}
                />
                <Grid container spacing={6}>
                    <Grid item xs={5} sm={5}>
                        <CardMedia
                            className={classes.media}
                            image={BASE_URL + storeAuction.photo}
                            title={storeAuction.name}
                        />
                        <Typography component="p" variant="subtitle1" className={classes.subheading}>
                            О предмете</Typography>
                        <Typography component="p" className={classes.description}>
                            {storeAuction.description}</Typography>
                    </Grid>

                    <Grid item xs={7} sm={7}>
                        {currentDate > new Date(storeAuction.bidStart)
                            ? (<>
                                <Timer endTime={storeAuction.bidEnd} update={update}/>
                                {storeAuction.bids.length > 0 &&
                                <Typography component="p" variant="subtitle1" className={classes.lastBid}>
                                    {` Последняя ставка: $ ${storeAuction.bids[0].bid}`}
                                </Typography>
                                }
                                {!localStorage.getItem('token') &&
                                <Typography>Пожалуйста, <Link to='/login'>авторизируйтесь</Link> для ставки.</Typography>}
                                {localStorage.getItem('token') &&
                                <AuctionBid auction={storeAuction} justEnded={justEnded} updateBids={updateBids}/>}
                            </>)
                            : <Typography component="p"
                                          variant="h6">{`Аукцион начнется в ${new Date(storeAuction.bidStart).toLocaleString()}`}</Typography>}
                    </Grid>

                </Grid>

            </Card>
            }
        </div>)
};

export default Auction;
