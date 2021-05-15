import { BrowserRouter, Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import Nav from '../components/nav/nav';
import LogIn from '../pages/log-in/logIn';
import SignUp from '../pages/sign-up/SignUp';
import Catalog from '../pages/catalog/catalog';
import Auctions from "../pages/auction/auctions";
import Product from '../pages/product/product'
import Basket from '../pages/basket/basket'
import Auction from "../pages/auction/auction";

export default function RootRouter() {
	return (
		// style={{ position: "relative" }}
		<main>
			<BrowserRouter>
				<Route component={Nav} path="*" />

				<NotAuthedPrivateRoute component={LogIn} path="/log-in" exact/>
				<NotAuthedPrivateRoute component={SignUp} path="/sign-up" exact/>
				<Route component={Auctions} path="/auctions" exact/>
				<Route component={Auction} path="/auctions/:id" exact/>
				<Route component={Catalog} path='/catalog' exact/>
				<Route component={Product} path='/product/:id' exact/>
				<Route component={Basket} path='/basket'/>

                <Route exact path="/" render={() => (
                    <Redirect to="/catalog"/>
                )}/>
			</BrowserRouter>
		</main>
	);
}

export const AuthedPrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/log-in",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export const NotAuthedPrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("token") ? (
                    <Redirect
                        to={{
                            pathname: "/catalog",
                            state: { from: props.location },
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};
