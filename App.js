/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsAndroid } from "react-native";
import BottomNavigation from './src/Components/Navigation/BottomNavigation';
import { connect } from 'react-redux';
import { changePlayBack } from './src/actions/changePlayBack';
import { bindActionCreators } from 'redux';

const requestStoragePermission = async () => {
	try {
		const granted = await PermissionsAndroid.requestMultiple(
			[
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
			],
			{
				title: "L'accès au stockage est requis",
				message: "Mwimbo besoin de cette autorisation pour répertorier et lire vos fichiers audio locaux.",
				buttonNegative: "Refuser",
			}
		);
		if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
			requestStoragePermission();
		}
	} catch (err) {
		console.warn(err);
	}
};

function App(props) {

	useEffect(() => {
		requestStoragePermission();
		let { playback, actions } = props;
	}, []);

	return (
		<NavigationContainer>
			<BottomNavigation />
		</NavigationContainer>
	);
}

const mapStateToProps = state => ({
	playback: state.playback,
});

const ActionCreators = Object.assign(
	{},
	changePlayBack,
);

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)