import { get as _get } from 'lodash';

/**
 * App theme in one place
 */
export const colors: any = {
	primary: {
		default: "#007aff",
		light: "#3395FF"
	},
	secondary: {
		default: "#000"
	},
	white: {
		default: "#fff"
	},
	black: {
		default: '#000',
		light: '#F1F1F1',
		xLight: '#FBFBFB'
	},
	error: {
		default: '#FF4B55'
	},
	accent: {
		"primary": "rgb(0, 122, 255)",
	},
	default: {
		background: '#FFF',
	},
	light: {
		background: '#FFF',
		inverseBackground: '#0a0a0a',
		cardBackground: "#f1f4f6",
		cardBackgroundBorder: "#5c5c5c",
		fontColor: "#333333",
		placeholder: "#5c5c5c",
		border: "#e3e3e3",
		logo: "#000"
	},
	dark: {
		background: '#0a0a0a',
		inverseBackground: '#FFF',
		cardBackground: '#242424',
		cardBackgroundBorder: '#5c5c5c',
		fontColor: "#FFF",
		border: "#f1f1f1",
		placeholder: "#a3a2a2",
		logo: "#FFF"
	}
}

export const styles = {
	flex1: {
		flex: 1
	},
	screenContainer: {
		flex: 1
	},
	text: {
		h3: {
			fontWeight: 'bold',
			fontSize: 24
		},
		p: {
			opacity: 0.8
		},
		center: {
			textAlign: 'center'
		},
		bold: {
			fontWeight: 'bold'
		},
		white: {
			color: colors.white.default
		},
		secondary: {
			color: colors.secondary.default
		}
	},
	button: {
		borderRadius: 32,
		height: 48,
		maxHeight: 48,
		paddingHorizontal: 8,
		marginHorizontal: 2,
		alignSelf: 'flex-start',
		display: 'flex', 
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		fullwidth: {
			alignSelf: 'auto',
			flex: 1
		},
		small: {
			height: 32
		},
		link: {
			textDecoration: 'underline'
		},
		theme: {
			"primary":  { backgroundColor:  colors.primary.default },
			"outlined": {
				"primary":  { borderColor:  colors.primary.default },
			}
		},
		contained: {
			default: {
				backgroundColor: colors.black.light
			},
			primary: {
				backgroundColor: colors.primary.default
			},
			secondary: {
				backgroundColor: colors.secondary.default
			},
			transparent: {
				paddingHorizontal: 8,
				backgroundColor: 'transparent'
			}
		},
		outlined: {
			default: {
				borderWidth: 1,
				borderColor: colors.black.light
			},
			primary: {
				borderWidth: 1,
				borderColor: colors.primary.default
			},
			secondary: {
				borderWidth: 1,
				borderColor: colors.secondary.default
			},
			black: {
				borderWidth: 1,
				borderColor: colors.white.default,
				backgroundColor: '#000'
			}
		},
	},
	label: {
		fontWeight: '600',
		fontSize: 15,
		lineHeight: 23,
		color: colors.black.default,
		default: { color: colors.black.default },
		white: { color: colors.white.default },
		primary: { color: colors.primary.default },
		secondary: { color: colors.secondary.default },
		link: { textDecorationLine: 'underline' },
	},
}

/**
 * Combine styles based on styleName passed by user
 */
export const getStyles = (styleName = '') =>  styleName.split(' ').map(style =>  _get(styles, style, {}));