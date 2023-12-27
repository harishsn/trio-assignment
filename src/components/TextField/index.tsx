import React, { useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { TextInput, View, Text } from "react-native";
import { colors } from '../../theme';
import { useTheme } from "../../context/Theme";


export type IEventType = {
	name: string;
	value: string;
}

const TextField: React.FC<any> = (props) => {

	const { theme } = useTheme()

	const styles = useMemo(() => {
		return {
			labelContainer: {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			},
			label: {
				textTransform: 'uppercase',
				fontWeight: '500',
				opacity: 0.8,
				fontSize: 12,
				paddingVertical: 6,
				flex: 1,
				color: 'black'
			},
			labelError: {
		
			},
			textField: {
				//flex: 1,
				color: 'black',
			},
			inputContainer: {
				backgroundColor: colors[theme].cardBackground,
				paddingHorizontal: 12,
				borderWidth: 1,
				borderColor: colors[theme].cardBackgroundBorder,
				borderRadius: 8,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				minHeight: 50,
				height: 50
			},
			inputContainerError: {
				borderColor: colors.error.default,
			},
			input: {
				paddingHorizontal: 8,
				paddingVertical: 0,
				flex: 1,
				fontWeight: '400',
				fontSize: 16,
				color: colors[theme].fontColor,
			},
			inputError: {
		
			},
			helperText: {
				opacity: 0.5,
				fontSize: 12,
				marginLeft: 6,
				paddingVertical: 3
			},
			helperTextError: {
				opacity: 0.9,
				color: colors.error.default,
			},
		}
	}, [theme])

	const handleOnChange = (text: string) => {
		props.onChange({ name: props.name, value: text })
	}

	return (
		<View style={[styles.textField, props.style]}>
			{ props.label &&
			// @ts-ignore
			<View style={styles.labelContainer}>
				<Text style={[styles.label, props.error ? styles['labelError'] : {}]}>{props.label}</Text>
				{props.renderLabelSuffix}
			</View> }
			<View style={[styles.inputContainer, props.inputContainerStyles, props.error ? styles['inputContainerError'] : {}]}>
				<View style={{ marginHorizontal: 2 }}>
					{props.renderPrefix}
				</View>
				<TextInput {...props} onChange={undefined} placeholderTextColor={colors[theme].placeholder} onChangeText={handleOnChange} style={[styles.input, props.inputStyles, props.error ? styles['inputError'] : {}]}></TextInput>
				{props.renderSuffix}
			</View>
			<Text style={[styles.helperText, props.error ? styles['helperTextError'] : {}]}>{props.helperText}</Text>
		</View>
	)
}

TextField.defaultProps = {
	value: '',
	label: undefined,
	renderSuffix: undefined,
	renderPrefix: undefined,
	error: undefined,
	helperText: undefined,
	style: undefined,
	onChange: () => { },
	name: undefined,
	defaultValue: undefined
}

TextField.propTypes = {
	name: PropTypes.string.isRequired,
}

export default TextField;