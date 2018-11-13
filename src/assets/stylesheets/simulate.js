import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

	addForm: {
		borderWidth: 3,
		borderColor: 'grey',
		paddingLeft: '10%',
		paddingRight: '10%',
		paddingTop: '5%',
		paddingBottom: '5%',
		width: '100%',
		alignItems: 'stretch',
		flexWrap: 'wrap',
		marginTop: 40
	},
	wrapAddFormDropDown: {
		borderWidth: 3,
		borderColor: '#000',
		width: '60%',
		height: 30,
		padding: 0,
		margin: 0
	},
	addFormDropDown: {
		borderWidth: 0,
		height: 20,
		padding: 0
	},
	box1: {
		borderBottomWidth: 3,
		borderColor: 'grey',
		paddingLeft: '10%',
		paddingRight: '10%',
		paddingTop: '1%',
		paddingBottom: '1%',
		width: '100%',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: 20
	},
	box1List: {
		alignItems: 'center',
		paddingTop: '3%',
		paddingBottom: '3%',
	},
	box1Number: {
		fontSize: 25
	},
	box1Text: {
		fontSize: 20
	},
	box1Center: {
		borderLeftWidth: 3,
		borderRightWidth: 3,
		borderColor: 'grey',
		paddingLeft: '10%',
		paddingRight: '10%',
		marginLeft: '10%',
		marginRight: '10%'
	},
	
	addFormBtnText: {
		textAlign: 'center',
		lineHeight: 25
	},
	addFormBtn: {
		padding: 2,
		marginLeft: '1%',
		width: '39.5%'
	},
	inputText: {
		width: '60%',
		marginRight: 3,
		marginBottom: 3,
		marginTop: 3
	},
	simulasionResult: {
		borderTopWidth: 3,
		borderBottomWidth: 3,
		borderColor: '#333333',
		paddingTop: 30,
		paddingBottom: 30
	},
	simulasionResultBtn: {
		marginLeft: '1%',
		width: '24%'
	}

});