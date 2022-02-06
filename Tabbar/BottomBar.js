import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Home from '../components/Home';
import Clinic from '../components/Clinic';
import Pill from '../components/Pill';
import More from '../components/More';


const Tab = createBottomTabNavigator();
const BottomBar = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                "tabBarActiveTintColor": "#8c33ff",
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Clinic"
                component={Clinic}
                options={{
                    tabBarLabel: 'Clinic',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pill"
                component={Pill}
                options={{
                    tabBarLabel: 'Pill',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="pill" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="dots-vertical" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default BottomBar;