/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import BottomNavigation from './src/Components/Navigation/BottomNavigation';

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

export default function App() {

	useEffect(() => {
		requestStoragePermission();
	}, []);

	return (
		<NavigationContainer>
			<BottomNavigation />
		</NavigationContainer>
	);
}
