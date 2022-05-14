/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { formatDuration } from '../../helpers/cast';
import Colors from '../../utilities/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function SongItem({ item }) {
    console.log('item', item);
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                console.log('item tapped');
            }}
        >
            <View style={styles.infos}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>
                    {item.artist ? item.artist + '-' : ''} <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
                </Text>
            </View>
            <View style={styles.icon}>
                <MaterialCommunityIcons
                    name="play-circle-outline"
                    color={Colors.SECONDARY}
                    size={30}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: 58,
        flexDirection: 'row',
    },
    title: {
        fontSize: 15,
        color: Colors.WHITE,
    },
    author: {
        fontSize: 10,
        color: Colors.SECONDARY,
    },
    duration: {
        fontSize: 10,
        color: Colors.SECONDARY,
    },
    infos: {
        flex: 3,
        marginLeft: 10,
    },
    icon: {
        flex: 1,
        alignItems: 'flex-end',
    },
});