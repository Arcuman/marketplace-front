import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShoppingBasketOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
	createStyles({
		menuLink: {
			marginRight: '15px',
			color: '#ffffff',
			textDecoration: 'none',
			fontSize: 17,
			display: 'flex',
			alignItems: 'center'
		},
		label: {
			fontSize: 20,
			marginRight: theme.spacing(10)
		},
		root: {
			display: 'flex',
			justifyContent: 'space-between',
			flexGrow: 1
		},
		navLeft: {
			display: 'flex',
			alignItems: 'center',

		},
		navRight: {
			display: 'flex',
			alignItems: 'center'
		},
		activeMenuLink: {
			fontWeight: 700,
			display: 'flex',
			alignItems: 'center' 
		},
		basketQuantityContainer: {
			position: 'relative',
			display: 'flex',
			alignItems: 'center',
			padding: '7px'
		},
		basketQuantity:{
			position: 'absolute',
			top: 0,
			right: 0,
			padding: '3px',
			backgroundColor: 'rgb(230,0,0)',
			fontSize: '10px',
			borderRadius: '45%'
		}
	})
);

export default function Nav() {
	const classes = useStyles();
	const basket = useSelector((store) => store.basket.basket);

	function calculateBasketQuantity(basket){
		const quantity = basket.reduce(function (accumulator, product) {
			return accumulator + product.quantity;
		}, 0);

		console.log(quantity);

		return quantity ? <span className={classes.basketQuantity}>{quantity}</span> : null
	}

	return (
		<AppBar position="static">
			<Toolbar className={classes.root}>
				{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<Menu />
				</IconButton> */}
				<div className={classes.navLeft}>
					<NavLink
						to="/catalog"
						activeClassName={classes.activeMenuLink}
						className={`${classes.menuLink} ${classes.label}`}
					>
						Торговая площадка
					</NavLink>
					<NavLink to="/catalog" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
						Каталог
					</NavLink>
					<NavLink to="/auctions" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
						Аукцион
					</NavLink>
					<NavLink to="/basket" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
						<span>Корзина</span>
						<div className={classes.basketQuantityContainer}>
							<ShoppingBasketOutlined />
							{basket && calculateBasketQuantity(basket)}
						</div>
					</NavLink>
					
				</div>
				<div className={classes.navRight}>
					<NavLink to="/log-in" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
						Логин
					</NavLink>
					<NavLink to="/sign-up" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
						Регистрация
					</NavLink>
				</div>
			</Toolbar>
		</AppBar>
	);
}
