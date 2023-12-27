import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { useTheme } from '../../context/Theme';

type ITypoGraphyProps = {
    children: React.ReactNode;
    style?: any;
}

export default ({ children, ...props }: ITypoGraphyProps) => { 

	const { theme } = useTheme();

	const styles: any = StyleSheet.create({
		color: {
			color: colors[theme].fontColor
		},
	})
	return 	<Text {...props} style={[styles.color, props.style]}>{ children }</Text> 
}