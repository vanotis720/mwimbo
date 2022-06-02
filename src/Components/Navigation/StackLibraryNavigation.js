/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import LibraryScreen from '../Screens/LibraryScreen';


const Stack = createNativeStackNavigator();

export default function StackLibraryNavigation() {
    return (
        <Stack.Navigator initialRouteName="LibraryScreen">
            <Stack.Screen
                name="LibraryScreen"
                component={LibraryScreen}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                }}
            />
            {/* <Stack.Screen name="Player" component={PlayerScreen} /> */}
        </Stack.Navigator>
    );
}
