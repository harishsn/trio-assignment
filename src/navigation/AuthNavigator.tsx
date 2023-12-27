//@ts-nocheck
import React from 'react'
import { View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../scenes/Auth/Login';
import Signup from '../scenes/Auth/Signup';
const Stack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="login">
			<Stack.Screen name="login" options={{ headerShown: true, headerTransparent: true  }} component={Login} />
			<Stack.Screen name="signup" options={{ headerShown: true, headerTransparent: true }} component={Signup} />
		</Stack.Navigator>
	)
}

export default AuthNavigator