/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PlayerScreen from '../Screens/PlayerScreen';
import LikeScreen from '../Screens/LikeScreen';
import Colors from '../../utilities/Color';
import StackLibraryNavigation from './StackLibraryNavigation';


const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Library"
            screenOptions={{
                tabBarActiveTintColor: Colors.WHITE,
                tabBarInactiveTintColor: Colors.SECONDARY,
                tabBarStyle: {
                    backgroundColor: Colors.PRINCIPAL,
                    paddingBottom: 5,
                    paddingTop: 5,
                    // borderTopRightRadius: 10,
                    // borderTopLeftRadius: 10,
                },
            }}>
            <Tab.Screen name="Home" component={PlayerScreen}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTintColor: Colors.WHITE,
                    tabBarLabel: 'Lecteur',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="music-circle-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Library" component={StackLibraryNavigation}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTintColor: Colors.WHITE,
                    tabBarLabel: 'Bibliothèque',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="playlist-music"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Like" component={LikeScreen}
                options={{
                    tabBarLabel: 'Favoris',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="favorite-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
