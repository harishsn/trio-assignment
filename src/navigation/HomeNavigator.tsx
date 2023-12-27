import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../scenes/Home/Home';

const Stack = createStackNavigator();

const screenOptions = {
	headerShown:true
}


const MainNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptions} initialRouteName='Home'>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1
	},
	navigator: {
	  borderTopWidth: 0,
	  backgroundColor: 'transparent',
	  elevation: 30
	}
  });

export default MainNavigator