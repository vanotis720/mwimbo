/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { State } from 'react-native-track-player';

await TrackPlayer.setupPlayer()
// The player is ready to be used

export default function PlayerScreen() {
	const state = await TrackPlayer.getState();
	if (state === State.Playing) {
		console.log('The player is playing');
	};
	var track = {
		url: 'http://example.com/avaritia.mp3', // Load media from the network
		title: 'Avaritia',
		artist: 'deadmau5',
		album: 'while(1<2)',
		genre: 'Progressive House, Electro House',
		date: '2014-05-20T07:00:00+00:00', // RFC 3339
		artwork: 'http://example.com/cover.png', // Load artwork from the network
		duration: 402 // Duration in seconds
	};

	const track2 = {
		url: require('./coelacanth.ogg'), // Load media from the app bundle
		title: 'Coelacanth I',
		artist: 'deadmau5',
		artwork: require('./cover.jpg'), // Load artwork from the app bundle
		duration: 166
	};


	// You can then [add](https://react-native-track-player.js.org/docs/api/functions/queue#addtracks-insertbeforeindex) the items to the queue
	await TrackPlayer.add([track, track2]);

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
