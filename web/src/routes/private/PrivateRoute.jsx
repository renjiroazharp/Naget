import React, { Component } from 'react';
import HomeContainer from '../../containers/Dashboard/Home';
import OrderContainer from '../../containers/Dashboard/Order/OrderContainer';
import Help from '../../containers/Dashboard/Help';
import Account from '../../containers/Dashboard/Account';
import { Route, Switch } from 'react-router-dom';
import Checkout from '../../containers/Dashboard/Step/Checkout';
import OrderDetail from '../../containers/Dashboard/Order/OrderDetail/OrderDetail';
import BottomNavigationBar from '../../component/BottomNavigationBar';
// const withoutBottomNavbar = () => {
// 	return <div />;
// };

// const DefaultContainer = () => {
// 	return <div />;
// };

export default class PublicRoute extends Component {
	render() {
		return (
			<div>
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<Route exact path="/" component={HomeContainer} />
							<Route path="/order" component={OrderContainer} />
							<Route path="/help" component={Help} />
							<Route path="/account" component={Account} />
							<Route path="/form_login" component={Checkout} />
							<Route path="/orderdetail/:id" component={OrderDetail} />
						</Switch>
					)}
				/>
				<BottomNavigationBar />
			</div>
		);
	}
}
