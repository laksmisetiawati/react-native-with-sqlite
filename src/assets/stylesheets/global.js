import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	body: {
		backgroundColor: '#ffffff',
		height: '100%'
	},
	flex1: {
		flex: 1
	},
	flexDirectionRow: {
		flexDirection: 'row'
	},
	container: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '80%'
	},
	textCenter: {
		textAlign: 'center'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	inputText: {
		borderWidth: 3,
		borderColor: '#000000',
		// marginBottom: 3,
		// marginTop: 3,
		// marginRight: 3,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 1,
		paddingBottom: 1
	},
	btn: {
		borderWidth: 3,
		marginBottom: 3,
		marginTop: 3,
		borderColor: '#000000'
	},
	tableHeader: {
		color: '#000000',
		backgroundColor: '#dddddd',
		padding: 10,
		textAlign: 'center'
	},
	tableBody: {
		color: '#000000',
		padding: 10,
		textAlign: 'center'
	},
	tableEvenClass: {
		backgroundColor: '#eeeeee'
	},
	tableOddClass: {
		backgroundColor: '#ffffff'
	},
	wrapAddFormDropDown: {
		borderWidth: 3,
		borderColor: '#000',
		height: 40,
		padding: 0,
		margin: 0
	},
	dropDown: {
		height: '100%',
		width: '100%'
	}

});