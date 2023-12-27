import React, { useMemo } from "react";
import { get as _get, find as _find } from 'lodash';
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";
import { colors, styles, getStyles } from "../../theme";

type IButtonProps = {
    label: string;
    onPress?: () => void;
    style?: any;
    styleName?: string;
    labelStyleName?: string;
    labelStyles?: any;
    loading?: boolean;
    disabled?: boolean;
    renderPrefix?: React.ReactNode;
    renderSuffix?: React.ReactNode;
}

const Button = ({ styleName, labelStyleName,labelStyles, style, ...props }: IButtonProps) => {

	/**
	 * get actuall styles for the corresponding string
	 */
	const computedStyles = useMemo(() => getStyles(styleName), [styleName]);
	const computedLabelStyles = useMemo(() => getStyles(labelStyleName), [labelStyleName]);

	return (
		<TouchableOpacity onPress={props.onPress} disabled={props.loading || props.disabled} style={[computedStyles, style]}>
			{ props.loading && <ActivityIndicator size="small" color="#FFF" /> }
			{props.renderPrefix}
			<Text style={[{...styles.label, ...labelStyles }, ...computedLabelStyles, { marginHorizontal: 3 } ]}>{ props.label }</Text>
			{props.renderSuffix}
		</TouchableOpacity>
	)
}

Button.defaultProps = {
	label: '',
	onPress: undefined,
	style: {},
	labelStyles: {},
	loading: false
}

export default Button;