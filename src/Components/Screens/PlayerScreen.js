/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PlayerScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.cover}>
				<Image source={require('../../assets/images/library-cover.jpeg')} style={styles.logo} />
				<Text style={styles.title}>Unstable</Text>
				<Text style={styles.author}>Mr. Kitty</Text>
			</View>
			<View style={styles.sliderContainer}>
				<Text style={styles.time}>00:00</Text>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={1}
					minimumTrackTintColor={Colors.WHITE}
					maximumTrackTintColor={Colors.SECONDARY}
					thumbTintColor={Colors.THIRD}
				/>
				<Text style={styles.time}>03:10</Text>
			</View>
			<View style={styles.control}>
				<View style={[styles.buttonsCol, { alignItems: 'flex-end' }]}>
					<TouchableOpacity onPress={() => alert('skip-previous')}>
						<MaterialCommunityIcons name="skip-previous" size={30} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-end' }]}>
					<TouchableOpacity onPress={() => alert('replay-10')}>
						<MaterialIcons name="replay-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsCol}>
					<TouchableOpacity onPress={() => alert('play-pause')} >
						<MaterialCommunityIcons name="play-circle" size={60} style={styles.playPauseIcon} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-start' }]}>
					<TouchableOpacity onPress={() => alert('forward-10')}>
						<MaterialIcons name="forward-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-start' }]}>
					<TouchableOpacity onPress={() => alert('skip-next')}>
						<MaterialCommunityIcons name="skip-next" size={30} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
	},
	cover: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: Colors.WHITE,
		marginTop: 15,
		marginBottom: 5,
	},
	author: {
		fontSize: 18,
		color: Colors.SECONDARY,
		marginBottom: 15,
	},
	sliderContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
	},
	slider: {
		flex: 1,
		height: 40,
		borderRadius: 10,
	},
	control: {
		flex: 1,
		flexDirection: 'row',
	},
	logo: {
		width: '75%',
		height: '75%',
		resizeMode: 'contain',
		borderColor: Colors.SECONDARY,
		borderWidth: 1,
		borderRadius: 15,
		marginTop: 20,
	},
	buttonsCol: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
	},
	playPauseIcon: {
		color: Colors.WHITE,
	},
	time: {
		fontSize: 10,
		color: Colors.SECONDARY,
		marginHorizontal: 5,
	},
});
