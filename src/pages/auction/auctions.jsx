import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText, ListItemSecondaryAction, IconButton, Divider, makeStyles, createStyles
} from '@material-ui/core';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ViewIcon from '@material-ui/icons/Visibility'
import {useHistory} from 'react-router';
import {getAllAuctions} from '../../redux/actions/auctionsAction';
import {BASE_URL} from "../../constants/constants";
import {NavLink} from "react-router-dom";
// import {productsReq} from "../../redux/actions/productAction";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '70%',
            margin: '0 auto',
        },
    }));

const calculateTimeLeft = (date) => {
    const difference = date - new Date()
    let timeLeft = {}
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            timeEnd: false
        }
    } else {
        timeLeft = {timeEnd: true}
    }
    return timeLeft
}


export default function Auctions() {
    const currentDate = new Date()
    const classes = useStyles();
    const showTimeLeft = (date) => {
        let timeLeft = calculateTimeLeft(date)
        return !timeLeft.timeEnd && <span>
      {timeLeft.days !== 0 && `${timeLeft.days} д `}
            {timeLeft.hours !== 0 && `${timeLeft.hours} ч `}
            {timeLeft.minutes !== 0 && `${timeLeft.minutes} м `}
            {timeLeft.seconds !== 0 && `${timeLeft.seconds} с`} осталось
    </span>
    }
    const auctionState = (auction) => {
        return (
            <span>
          {currentDate < new Date(auction.bidStart) && `Аукцион начнется ${new Date(auction.bidStart).toLocaleString()}`}
                {currentDate > new Date(auction.bidStart) && currentDate < new Date(auction.bidEnd) && <>{`Аукцион идет | кол-во ставок: ${auction.bids.length || 0} |`} {showTimeLeft(new Date(auction.bidEnd))}</>}
                {currentDate > new Date(auction.bidEnd) && `Аукцион закончится | кол-во ставок: ${auction.bids?.length || 0}  `}
                {currentDate > new Date(auction.bidStart) && auction.bids?.length > 0 && ` | Последняя ставка : $ ${auction.bids[auction.bids.length - 1].bid}`}
      </span>
        )
    }

    const history = useHistory();
    const dispatch = useDispatch();
    // const auctionStoreError = useSelector((store) => store.auctions.error);
    const auctions = useSelector((store) => store.auctions.auctions);
    console.log({auctions})
    useEffect(() => {
        if (!auctions.length) {
            dispatch(getAllAuctions());
        }
    }, [auctions.length, dispatch])

    return (
        <div className={classes.root}>
            <List dense>
                {auctions.map((auction, i) => {
                    return <span key={i}>
              <ListItem button onClick={() => history.push(`/auctions/${auction.id}`)}>
                <ListItemAvatar>
                  <Avatar variant='square' src={BASE_URL + auction.photo}/>
                </ListItemAvatar>
                <ListItemText primary={auction.name} secondary={auctionState(auction)}/>
                <ListItemSecondaryAction>
                    <NavLink to={location => ({...location, pathname: "/auctions/" + auction.id})}>
                      <IconButton aria-label="View" color="primary">
                        <ViewIcon/>
                      </IconButton>
                    </NavLink>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
            </span>
                })}
            </List>
        </div>

    )
}
