import React, {Component} from 'react';
import {
	Provider,
	connect
} from 'react-redux';

import Routes from './configs/routes';
import configureStore from './stores';

const store = configureStore();

export default class Main extends Component {
	render() {
		return (
			<Provider store={store}>
				<Routes />
			</Provider>
		)
	}
	// render() {
	// 	return (
	// 		<Routes />
	// 	)
	// }
}
