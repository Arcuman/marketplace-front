import React, {useState, useEffect} from "react";
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "../../constants/constants";
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";

// const socketOptions = {};
console.log({ENDPOINT})
const socket = socketIOClient(ENDPOINT);

const useStyles = makeStyles(theme => ({
    bidHistory: {
        marginTop: '20px',
        backgroundColor: '#f3f3f3',
        padding: '16px'
    },
    placeForm: {
        margin: '0px 16px 16px',
        backgroundColor: '#e7ede4',
        display: 'inline-block'
    },
    marginInput: {
        margin: 16
    },
    marginBtn: {
        margin: '8px 16px 16px'
    }
}))

function AuctionBid(props) {
    const classes = useStyles()
    // const [response, setResponse] = useState("");
    const [bid, setBid] = useState('')

    useEffect(() => {
        socket.emit('joinedRoom', {room: props.auction.id})
        return () => {
            socket.emit('leftRoom', {room: props.auction.id})
        }
    }, [props.auction.id])
    useEffect(() => {
        socket.on('newBid', bid => {
            console.log(bid);
            props.updateBids(bid)
        })
        return () => {
            socket.off('newBid')
        }
    })

    const handleChange = event => {
        setBid(event.target.value)
    }

    const getLocalDate = (bidDate) => {
        const date = new Date(bidDate);
        const hours = date.getHours() - 3;
        console.log( new Date(date.setHours(hours)));
        return date.setHours(hours);
    }

    const placeBid = () => {
        let newBid = {
            auctionId: props.auction.id,
            bid: bid,
            time: new Date(),
        }
        socket.emit('newBid', {
            room: props.auction.id,
            bidInfo: newBid,
            token: localStorage.getItem('token')
        })
        setBid('')
    }
    const minBid = props.auction.bids && props.auction.bids.length > 0 ? props.auction.bids[0].bid : props.auction.price
    return (
        <div>
            {!props.justEnded && new Date() < getLocalDate(props.auction.bidEnd) && <div className={classes.placeForm}>
                <TextField id="bid" label="???????? ???????????? ($)"
                           value={bid} onChange={handleChange}
                           type="number" margin="normal"
                           helperText={`?????????????? $${Number(minBid) + 1} ?????? ????????????`}
                           className={classes.marginInput}/><br/>
                <Button variant="contained" className={classes.marginBtn} color="secondary"
                        disabled={bid < (minBid + 1)} onClick={placeBid}>Place Bid</Button><br/>
            </div>}
            <div className={classes.bidHistory}>
                <Typography variant="h6">?????? ????????????</Typography><br/>
                <Grid container spacing={4}>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="subtitle1" color="primary">????????????</Typography>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Typography variant="subtitle1" color="primary">?????????? ????????????</Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Typography variant="subtitle1" color="primary">????????????????????</Typography>
                    </Grid>
                </Grid>
                {props.auction.bids.map((item, index) => {
                    return <Grid container spacing={4} key={index}>
                        <Grid item xs={3} sm={3}><Typography variant="body2">${item.bid}</Typography></Grid>
                        <Grid item xs={5} sm={5}><Typography
                            variant="body2">{new Date(item.time).toLocaleString()}</Typography></Grid>
                        <Grid item xs={4} sm={4}><Typography variant="body2">{item.bidder.email}</Typography></Grid>
                    </Grid>
                })}

            </div>
        </div>
    )
}

export default AuctionBid;
