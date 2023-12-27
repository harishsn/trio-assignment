import React, { useLayoutEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from "../../../theme";
import { useTheme } from "../../../context/Theme";
import LogoSVG from '../../../assets/icons/logo'
import Typography from "../../../components/Typography";
import { useAuth } from "../../../context/Auth";

export default ({ navigation }: any) => {
    const { theme } = useTheme();
    const { logout, profile } = useAuth();

    useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: '',
			headerStyle: { opacity: 1, elevation: 0, shadowOpacity: 0, borderBottomWidth: 0  },
			headerTransparent: false,
			headerBackground: () => (
				<View
					style={{
						backgroundColor:colors[theme].background,
						...StyleSheet.absoluteFillObject
					}}
				/>
			),
            headerLeft: () => 
            <View style={{ paddingHorizontal: 16 }}>
                <LogoSVG color={colors[theme].inverseBackground} width={60}/>
            </View>,
            headerRight: () => 
            <TouchableOpacity onPress={() => logout()} style={{ marginRight: 16, display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginLeft: 16, opacity: 0.9, fontSize: 16, fontWeight: '400' }}>Logout</Typography>
            </TouchableOpacity>,
		});
	}, [navigation, theme]);


    return (
        <>
            {/* <SafeAreaView edges={['top']} style={{ flex: 0, backgroundColor: colors[theme].background }} /> */}
            <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors[theme].cardBackground, position: 'relative' }}>
                <ScrollView style={{ padding: 16 }}>
                <Typography style={{ color: colors[theme].fontColor, marginLeft: 16, fontSize: 32 }}>
                        Hey, { profile?.name }
                    </Typography>
                    <Typography style={{ color: colors[theme].fontColor, marginLeft: 16, fontSize: 32 }}>
                        One name, all things Web3.
                    </Typography>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}