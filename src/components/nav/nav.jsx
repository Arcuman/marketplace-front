import { AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { ShoppingBasketOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
	createStyles({
		menuLink: {
			marginRight: '15px',
			color: '#ffffff',
			textDecoration: 'none',
			fontSize: 17,
			display: 'flex',
			alignItems: 'center',
			'&:hover': {
                cursor: "pointer",
             },
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
	const history = useHistory();
	function calculateBasketQuantity(basket){
		const quantity = basket.reduce(function (accumulator, product) {
			return accumulator + product.quantity;
		}, 0);


		return quantity ? <span className={classes.basketQuantity}>{quantity}</span> : null
	}

	function rightNavRoutes(token){
		return token ? 
		<>
			<NavLink to="/my-products" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
				Мои продукты
			</NavLink>
			<NavLink to="/my-orders" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
				Мои покупки
			</NavLink>
			<NavLink to="/my-auctions" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
				Мои аукционы
			</NavLink> 
			<NavLink to="/my-profile" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
				Профиль
			</NavLink> 
			<span className={classes.menuLink} onClick={() => {
				 localStorage.removeItem('token')
				 history.push('/log-in')
			}}>
				Выйти
			</span> 
		</>
		: 
		<>
			<NavLink to="/log-in" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
			Логин
			</NavLink>
			<NavLink to="/sign-up" activeClassName={classes.activeMenuLink} className={classes.menuLink}>
				Регистрация
			</NavLink>
		</>
	
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
					{rightNavRoutes(localStorage.getItem('token'))}
				</div>
			</Toolbar>
		</AppBar>
	);
}
