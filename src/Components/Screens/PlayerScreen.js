/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../../utilities/Color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, { State, Event, useProgress, usePlaybackState, useTrackPlayerEvents, Capability } from 'react-native-track-player';

var tracks = [{
	id: '1',
	url: 'file:///storage/emulated/0/Download/mood_mp3_26655.mp3',
	title: 'Keys of moon',
	artist: 'The Epic Hero',
	artwork: require('../../assets/images/logo.png'),
	album: '',
	duration: 149,
}, {
	id: '2',
	url: 'file:///storage/emulated/0/Download/alan_walker_alone_mp3_46103.mp3',
	title: 'Equinox',
	artist: 'Purple Cat',
	artwork: require('../../assets/images/library-cover.jpeg'),
	album: '',
	duration: 140,
}];

const initializePlayer = async () => {
	try {
		await TrackPlayer.setupPlayer();

		await TrackPlayer.updateOptions({
			stopWithApp: false, // false=> music continues in background even when app is closed

			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.Stop,
				Capability.SeekTo,
			],

			// Capabilities that will show up when the notification is in the compact form on Android
			compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
		});
	} catch (e) {
		console.log(e);
		// to-do handle error
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

export default function PlayerScreen() {
	const [isPlaying, setPlaying] = useState(false);
	const [trackTitle, setTrackTitle] = useState();
	const [trackArtist, setTrackArtist] = useState();
	const [trackArtwotk, setTrackArtwork] = useState();

	const playbackState = usePlaybackState();
	const progress = useProgress();
	const playOrPauseIcon = isPlaying ? 'pause' : 'play-circle';

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			const track = await TrackPlayer.getTrack(event.nextTrack);
			const { title, artist, artwork } = track || {};
			setTrackTitle(title);
			setTrackArtist(artist);
			setTrackArtwork(artwork);
		}
	});


	useEffect(() => {
		initializePlayer();
		playlistTrack();
	}, []);

	const playTrack = async (playbackState) => {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack !== null) {
			if (playbackState === State.Playing) {
				await TrackPlayer.pause();
				setPlaying(false);
			};
			if (playbackState === State.Paused) {
				await TrackPlayer.play();
				setPlaying(true);
			};
		}
	};

	const playlistTrack = async () => {
		try {
			await TrackPlayer.add(tracks);
			console.log('added' + tracks);
		} catch (error) {
			console.log(error);
		}

	};


	return (
		<View style={styles.container}>
			<View style={styles.cover}>
				<Image source={trackArtwotk} style={styles.artwotk} />
				<Text style={styles.title}>{trackTitle}</Text>
				<Text style={styles.author}>{trackArtist}</Text>
				<MaterialIcons name="favorite-outline" size={35} color={Colors.WHITE} />
			</View>
			<View style={styles.sliderContainer}>
				<Text style={styles.time}>
					{new Date(progress.position * 1000).toISOString().substr(14, 5)}
				</Text>
				<Slider
					style={styles.slider}
					minimumValue={0}
					maximumValue={progress.duration}
					value={progress.position}
					onSlidingComplete={(val) => onSliderValueChange(val)}
					minimumTrackTintColor={Colors.WHITE}
					maximumTrackTintColor={Colors.SECONDARY}
					thumbTintColor={Colors.WHITE}
				/>
				<Text style={styles.time}>
					{new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
				</Text>
			</View>
			<View style={styles.control}>
				<View style={[styles.buttonsCol]}>
					<TouchableOpacity onPress={() => prevTack()}>
						<MaterialCommunityIcons name="skip-previous" size={30} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol]}>
					<TouchableOpacity onPress={() => skipTo(progress.position - 10)}>
						<MaterialIcons name="replay-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsCol, { marginBottom: 12 }}>
					<TouchableOpacity onPress={() => playTrack(playbackState)} >
						<MaterialCommunityIcons name={playOrPauseIcon} size={60} style={styles.playPauseIcon} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol]}>
					<TouchableOpacity onPress={() => skipTo(progress.position + 10)}>
						<MaterialIcons name="forward-10" size={35} color={Colors.WHITE} />
					</TouchableOpacity>
				</View>
				<View style={[styles.buttonsCol]}>
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
		marginTop: 30
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
	artwotk: {
		width: '75%',
		height: '75%',
		resizeMode: 'contain',
		borderColor: Colors.PRINCIPAL,
		borderWidth: 1,
		borderRadius: 15,
		marginTop: 30
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
