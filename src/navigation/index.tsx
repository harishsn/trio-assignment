import React, { useEffect } from 'react'
import { get as _get } from 'lodash';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { colors } from '../theme';
import { useAuth } from '../context/Auth';

const Stack = createStackNavigator();

const screenOptions = 
	({route, navigation}: any) => ({
		presentation: "modal",
		headerShown: false,
		cardStyle: {
			backgroundColor: 'transparent',
		},
		// @ts-ignore
        cardStyleInterpolator: ({current: { progress }}: {current: { progress: any }}) => ({
            cardStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                }),
            },
            overlayStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                }),
            },
        }),
		...TransitionPresets.ModalSlideFromBottomIOS,
	})


const Navigator = () => {
	const { token } = useAuth();
	const navigationRef = React.useRef<any>();

	const MyTheme = {
		...DefaultTheme,
		colors: {
		  ...DefaultTheme.colors,
		  background: colors.secondary.default
		},
	};

	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer
			ref={navigationRef}
			theme={MyTheme}>
                {/* @ts-ignore */}
				<Stack.Navigator screenOptions={screenOptions}>
						{ 
						/**
						 * Check for token and naviagte to Home if token exists
						 */
						}
						{ !token ? <Stack.Screen name="auth" component={AuthNavigator} /> :
						<Stack.Screen name="mainscreen" component={HomeNavigator} /> }
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Navigator;