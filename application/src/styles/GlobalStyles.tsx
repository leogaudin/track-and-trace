import React from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default EStyleSheet.create({
	view: {
		padding: '10rem',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: '25rem',
		marginTop: '20rem',
	},
	big: {
		fontSize: '35rem',
	},
	button: {
		padding: '20rem',
		margin: '20rem',
		borderRadius: '50rem',
		backgroundColor: 'ghostwhite',
	},
	shadow: {
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {height: 3},
	},
	horizontal: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	transparent: {
		opacity: 0.5,
	}
});
