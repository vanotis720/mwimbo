/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, Image, FlatList, StyleSheet, DeviceEventEmitter } from 'react-native';
import MusicFiles from 'react-native-get-music-files';
import Colors from '../../utilities/Color';
import SongItem from '../Parts/SongItem';
import { connect } from 'react-redux';
import { changePlayBack } from '../../actions/changePlayBack';
import { bindActionCreators } from 'redux';


class LibraryScreen extends React.Component {
	constructor(props) {
		super(props);
		let { playback, actions } = props;

		console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
		console.log(playback);
		console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');


		this.state = {
			songs: [],
		};

		DeviceEventEmitter.addListener(
			'onBatchReceived',
			(params) => {
				this.setState({
					songs: [
						...this.state.songs,
						...params.batch
					]
				});
				// console.log('onBatchReceived', this.state.songs);
			}
		);

		DeviceEventEmitter.addListener(
			'onLastBatchReceived',
			(params) => {
				this.setState(alert('last batch sent'));
			}
		);
	}

	componentDidMount() {
		MusicFiles.getAll({
			id: true,
			blured: false,
			artist: true,
			duration: true,
			cover: true,
			title: true,
			batchNumber: 5,
			minimumSongDuration: 10000,
			fields: ['title', 'artwork', 'duration', 'artist', 'genre', 'lyrics', 'albumTitle']
		});
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeAllListeners();
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image source={require('../../assets/images/library-cover.jpeg')} style={styles.logo} />
					<Text style={styles.title}>Bibliothèque</Text>
				</View>
				<View style={styles.playlist}>
					<FlatList
						data={this.state.songs}
						renderItem={({ item }) => <SongItem track={item} navigation={this.props.navigation} />}
						keyExtractor={item => item.id}
					/>
				</View>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.PRINCIPAL,
		flex: 1,
	},
	header: {
		flex: 3,
		flexDirection: 'row',
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 10,
		paddingTop: 10,
	},
	playlist: {
		flex: 8,
		paddingRight: 40,
		paddingLeft: 20,
		paddingBottom: 5,
		paddingTop: 5,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		color: Colors.WHITE,
		fontSize: 23,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	logo: {
		width: 130,
		height: 130,
		resizeMode: 'contain',
		marginRight: 10,
		borderColor: Colors.SECONDARY,
		borderWidth: 1,
		borderRadius: 10,
	},
});

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

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)