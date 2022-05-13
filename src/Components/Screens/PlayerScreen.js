/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { State, Event, useProgress } from 'react-native-track-player';

var track = {
	id: '1',
	url: 'file:///storage/emulated/0/Download/mood_mp3_26655.mp3',
	title: 'Keys of moon',
	artist: 'The Epic Hero',
	artwork: 'https://picsum.photos/id/1003/200/300',
	album: '',
	duration: 149,
};

const track2 = {
	id: '2',
	url: 'file:///storage/emulated/0/Download/alan_walker_alone_mp3_46103.mp3',
	title: 'Equinox',
	artist: 'Purple Cat',
	artwork: 'https://picsum.photos/id/1016/200/300',
	album: '',
	duration: 140,
};



export default function PlayerScreen() {
	const [isPlaying, setPlaying] = useState(false);
	const playOrPauseIcon = isPlaying ? 'pause' : 'play-circle';
	const artImg = require('../../assets/images/library-cover.jpeg');
	const progress = useProgress();


	useEffect(() => {
		initializePlayer();
		playlistTrack();
	}, []);

	const initializePlayer = async () => {
		try {
			await TrackPlayer.setupPlayer();
		} catch (e) {
			console.log(e);
			// to-do handle error
		}
	};

	const playlistTrack = async () => {
		await TrackPlayer.add([track, track2]);
		console.log('added');

	};

	const playTrack = async () => {
		const state = await TrackPlayer.getState();
		if (state === State.Playing) {
			await TrackPlayer.pause();
			setPlaying(false);
		};
		if (state === State.Paused) {
			await TrackPlayer.play();
			setPlaying(true);
		};
		if (state === State.Stopped) {
			await TrackPlayer.play();
			setPlaying(true);
		}
	};

	const prevTack = async () => {
		try {
			await TrackPlayer.skipToPrevious();
		} catch (error) {
			// to-do handle error
		}
	};

	const nextTack = async () => {
		try {
			await TrackPlayer.skipToNext();
		} catch (error) {
			// to-do handle error
		}
	};

	const skipTo = async (time) => {
		await TrackPlayer.seekTo(time);
	};

	const onSliderValueChange = async (value) => {
		await TrackPlayer.seekTo(value);
	};

	return (
		<View style={styles.container}>
			<View style={styles.cover}>
				<Image source={artImg} style={styles.logo} />
				<Text style={styles.title}>Unstable</Text>
				<Text style={styles.author}>Mr. Kitty</Text>
			</View>
			<View style={styles.sliderContainer}>
				<Text style={styles.time}>00:00</Text>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={100}
					value={progress.position}
					onSlidingComplete={(val) => onSliderValueChange(val)}
					minimumTrackTintColor={Colors.WHITE}
					maximumTrackTintColor={Colors.SECONDARY}
					thumbTintColor={Colors.THIRD}
				/>
				<Text style={styles.time}>03:10</Text>
			</View>
			<View style={styles.control}>
				<View style={[styles.buttonsCol, { alignItems: 'flex-end' }]}>
					<TouchableOpacity onPress={() => prevTack()}>
						<MaterialCommunityIcons name="skip-previous" size={30} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-end' }]}>
					<TouchableOpacity onPress={() => skipTo(progress.position - 10)}>
						<MaterialIcons name="replay-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsCol}>
					<TouchableOpacity onPress={() => playTrack()} >
						<MaterialCommunityIcons name={playOrPauseIcon} size={60} style={styles.playPauseIcon} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-start' }]}>
					<TouchableOpacity onPress={() => skipTo(progress.position + 10)}>
						<MaterialIcons name="forward-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol, { alignItems: 'flex-start' }]}>
					<TouchableOpacity onPress={() => nextTack()}>
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
