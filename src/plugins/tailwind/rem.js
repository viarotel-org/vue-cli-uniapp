const { colors, styleData } = require('./utils');

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	corePlugins: {
		preflight: false,
		accessibility: false,
		space: false,
		divideWidth: false,
		divideColor: false,
		divideOpacity: false,
		divideStyle: false,
	},
	purge: [
		"./src/pages/**/*.vue",
		"./src/components/**/*.vue",
		'./vue.config.js'
	],
	target: 'relaxed',
	prefix: '',
	important: false,
	separator: '_',
	presets: [],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',

			...colors,
		},
		spacing: {
			px: '1px',
			'0': '0',
			// 'px-2': '2px',
			...styleData('px-$:$px', 2, 10),

			// '1': '0.25rem',
			...styleData('$:$rem', 1, 10, 0.25),

			// '12': '3rem'
			...styleData('$:$rem', 12, 300, 0.25, 2),
		},
		backgroundColor: theme => theme('colors'),
		backgroundImage: {
			none: 'none',
			'gradient-to-t': 'linear-gradient(to top, var(--gradient-color-stops))',
			'gradient-to-tr': 'linear-gradient(to top right, var(--gradient-color-stops))',
			'gradient-to-r': 'linear-gradient(to right, var(--gradient-color-stops))',
			'gradient-to-br': 'linear-gradient(to bottom right, var(--gradient-color-stops))',
			'gradient-to-b': 'linear-gradient(to bottom, var(--gradient-color-stops))',
			'gradient-to-bl': 'linear-gradient(to bottom left, var(--gradient-color-stops))',
			'gradient-to-l': 'linear-gradient(to left, var(--gradient-color-stops))',
			'gradient-to-tl': 'linear-gradient(to top left, var(--gradient-color-stops))',
		},
		gradientColorStops: theme => theme('colors'),
		backgroundOpacity: theme => theme('opacity'),
		backgroundPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top',
		},
		backgroundSize: {
			auto: 'auto',
			cover: 'cover',
			contain: 'contain',

			'w-full': '100% auto',
			'h-full': 'auto 100%',
			'full': '100% 100%',

			// 'w-1': '0.25rem auto',
			...styleData('w-$:$rem 100%', 1, 10, 0.25),
			// 'w-12': '3rem auto',
			...styleData('w-$:$rem 100%', 12, 100, 0.25, 2),

			// 'h-1': 'auto 0.25rem',
			...styleData('h-$:100% $rem', 1, 10, 0.25),
			// 'h-12': 'auto 3rem'
			...styleData('h-$:100% $rem', 12, 100, 0.25, 2),

		},
		borderColor: theme => ({
			...theme('colors'),
			default: theme('colors.gray.300', 'currentColor'),
		}),
		borderOpacity: theme => theme('opacity'),
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			default: '0.25rem',
			md: '0.375rem',
			lg: '0.5rem',
			xl: '0.75rem',
			'2xl': '1rem',
			'3xl': '1.5rem',
			'4xl': '2.5rem',
			'5xl': '4.5rem',
			'6xl': '8.5rem',
			full: '9999px',
		},
		borderWidth: {
			'0': '0',
			default: '1px',
			...styleData('px-$:$px', 2, 10),
		},
		boxShadow: {
			xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
			none: 'none',
		},
		container: {},
		cursor: {
			auto: 'auto',
			default: 'default',
			pointer: 'pointer',
			wait: 'wait',
			text: 'text',
			move: 'move',
			'not-allowed': 'not-allowed',
		},
		divideColor: theme => theme('borderColor'),
		divideOpacity: theme => theme('borderOpacity'),
		divideWidth: theme => theme('borderWidth'),
		fill: {
			current: 'currentColor',
		},
		flex: {
			'1': '1 1 0%',
			auto: '1 1 auto',
			initial: '0 1 auto',
			none: 'none',
		},
		flexGrow: {
			'0': '0',
			default: '1',
			...styleData('$:$', 2, 5),
		},
		flexShrink: {
			'0': '0',
			default: '1',
		},
		fontFamily: {
			sans: [
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
		},
		fontSize: {
			'3xs': '0.125rem',
			'2xs': '0.5rem',
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
		},
		fontWeight: {
			hairline: '100',
			thin: '200',
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800',
			black: '900',
		},
		height: theme => ({
			auto: 'auto',
			full: '100%',
			screen: '100vh',
			...theme('spacing'),
		}),
		inset: {
			'0': '0',
			auto: 'auto',
			'1_2': '50%',
			'-1_2': '-50%',
		},
		letterSpacing: {
			tighter: '-0.05em',
			tight: '-0.025em',
			normal: '0',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.1em',
		},
		lineHeight: {
			none: '1',
			tight: '1.25',
			snug: '1.375',
			normal: '1.5',
			relaxed: '1.625',
			loose: '2',
			'3': '.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'7': '1.75rem',
			'8': '2rem',
			'9': '2.25rem',
			'10': '2.5rem',
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal',
		},
		margin: (theme, {
			negative
		}) => ({
			auto: 'auto',
			...negative(theme('spacing')),
			...theme('spacing'),
		}),
		maxHeight: {
			full: '100%',
			screen: '100vh',
		},
		maxWidth: (theme, {
			breakpoints
		}) => ({
			none: 'none',
			xs: '20rem',
			sm: '24rem',
			md: '28rem',
			lg: '32rem',
			xl: '36rem',
			'2xl': '42rem',
			'3xl': '48rem',
			'4xl': '56rem',
			'5xl': '64rem',
			'6xl': '72rem',
			full: '100%',
			...breakpoints(theme('screens')),
		}),
		minHeight: {
			'0': '0',
			full: '100%',
			screen: '100vh',
		},
		minWidth: {
			'0': '0',
			full: '100%',
		},
		objectPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top',
		},
		opacity: {
			'0': '0',
			'25': '0.25',
			'50': '0.5',
			'75': '0.75',
			'100': '1',
		},
		order: {
			first: '-9999',
			last: '9999',
			none: '0',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
		},
		outline: {
			none: ['2px solid transparent', '2px'],
			white: ['2px dotted white', '2px'],
			black: ['2px dotted black', '2px'],
		},
		padding: theme => theme('spacing'),
		placeholderColor: theme => theme('colors'),
		placeholderOpacity: theme => theme('opacity'),
		space: (theme, {
			negative
		}) => ({
			...theme('spacing'),
			...negative(theme('spacing')),
		}),
		stroke: {
			current: 'currentColor',
		},
		strokeWidth: {
			'0': '0',
			'1': '1',
			'2': '2',
		},
		textColor: theme => theme('colors'),
		textOpacity: theme => theme('opacity'),
		width: theme => ({
			auto: 'auto',
			...theme('spacing'),
			'1_2': '50%',
			'1_3': '33.333333%',
			'2_3': '66.666667%',
			'1_4': '25%',
			'2_4': '50%',
			'3_4': '75%',
			'1_5': '20%',
			'2_5': '40%',
			'3_5': '60%',
			'4_5': '80%',
			'1_6': '16.666667%',
			'2_6': '33.333333%',
			'3_6': '50%',
			'4_6': '66.666667%',
			'5_6': '83.333333%',
			'1_12': '8.333333%',
			'2_12': '16.666667%',
			'3_12': '25%',
			'4_12': '33.333333%',
			'5_12': '41.666667%',
			'6_12': '50%',
			'7_12': '58.333333%',
			'8_12': '66.666667%',
			'9_12': '75%',
			'10_12': '83.333333%',
			'11_12': '91.666667%',
			full: '100%',
			screen: '100vw',
		}),
		zIndex: {
			auto: 'auto',
			'-1': '-1',
			'0': '0',
			'10': '10',
			'20': '20',
			'30': '30',
			'40': '40',
			'50': '50',
		},
		gap: theme => theme('spacing'),
		gridTemplateColumns: {
			none: 'none',
			'1': 'repeat(1, minmax(0, 1fr))',
			'2': 'repeat(2, minmax(0, 1fr))',
			'3': 'repeat(3, minmax(0, 1fr))',
			'4': 'repeat(4, minmax(0, 1fr))',
			'5': 'repeat(5, minmax(0, 1fr))',
			'6': 'repeat(6, minmax(0, 1fr))',
			'7': 'repeat(7, minmax(0, 1fr))',
			'8': 'repeat(8, minmax(0, 1fr))',
			'9': 'repeat(9, minmax(0, 1fr))',
			'10': 'repeat(10, minmax(0, 1fr))',
			'11': 'repeat(11, minmax(0, 1fr))',
			'12': 'repeat(12, minmax(0, 1fr))',
		},
		gridAutoColumns: {
			auto: 'auto',
			min: 'min-content',
			max: 'max-content',
			fr: 'minmax(0, 1fr)',
		},
		gridColumn: {
			auto: 'auto',
			'span-1': 'span 1 / span 1',
			'span-2': 'span 2 / span 2',
			'span-3': 'span 3 / span 3',
			'span-4': 'span 4 / span 4',
			'span-5': 'span 5 / span 5',
			'span-6': 'span 6 / span 6',
			'span-7': 'span 7 / span 7',
			'span-8': 'span 8 / span 8',
			'span-9': 'span 9 / span 9',
			'span-10': 'span 10 / span 10',
			'span-11': 'span 11 / span 11',
			'span-12': 'span 12 / span 12',
			'span-full': '1 / -1',
		},
		gridColumnStart: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
			'13': '13',
		},
		gridColumnEnd: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12',
			'13': '13',
		},
		gridTemplateRows: {
			none: 'none',
			'1': 'repeat(1, minmax(0, 1fr))',
			'2': 'repeat(2, minmax(0, 1fr))',
			'3': 'repeat(3, minmax(0, 1fr))',
			'4': 'repeat(4, minmax(0, 1fr))',
			'5': 'repeat(5, minmax(0, 1fr))',
			'6': 'repeat(6, minmax(0, 1fr))',
		},
		gridAutoRows: {
			auto: 'auto',
			min: 'min-content',
			max: 'max-content',
			fr: 'minmax(0, 1fr)',
		},
		gridRow: {
			auto: 'auto',
			'span-1': 'span 1 / span 1',
			'span-2': 'span 2 / span 2',
			'span-3': 'span 3 / span 3',
			'span-4': 'span 4 / span 4',
			'span-5': 'span 5 / span 5',
			'span-6': 'span 6 / span 6',
			'span-full': '1 / -1',
		},
		gridRowStart: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
		},
		gridRowEnd: {
			auto: 'auto',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
		},
		transformOrigin: {
			center: 'center',
			top: 'top',
			'top-right': 'top right',
			right: 'right',
			'bottom-right': 'bottom right',
			bottom: 'bottom',
			'bottom-left': 'bottom left',
			left: 'left',
			'top-left': 'top left',
		},
		scale: {
			'0': '0',
			'50': '.5',
			'75': '.75',
			'90': '.9',
			'95': '.95',
			'100': '1',
			'105': '1.05',
			'110': '1.1',
			'125': '1.25',
			'150': '1.5',
		},
		rotate: {
			'-180': '-180deg',
			'-90': '-90deg',
			'-45': '-45deg',
			'-12': '-12deg',
			'-6': '-6deg',
			'-3': '-3deg',
			'-2': '-2deg',
			'-1': '-1deg',
			'0': '0',
			'1': '1deg',
			'2': '2deg',
			'3': '3deg',
			'6': '6deg',
			'12': '12deg',
			'45': '45deg',
			'90': '90deg',
			'180': '180deg',
		},
		translate: (theme, {
			negative
		}) => ({
			...theme('spacing'),
			...negative(theme('spacing')),
			'-full': '-100%',
			'-1_2': '-50%',
			'1_2': '50%',
			full: '100%',
		}),
		skew: {
			'-12': '-12deg',
			'-6': '-6deg',
			'-3': '-3deg',
			'-2': '-2deg',
			'-1': '-1deg',
			'0': '0',
			'1': '1deg',
			'2': '2deg',
			'3': '3deg',
			'6': '6deg',
			'12': '12deg',
		},
		transitionProperty: {
			none: 'none',
			all: 'all',
			default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
			colors: 'background-color, border-color, color, fill, stroke',
			opacity: 'opacity',
			shadow: 'box-shadow',
			transform: 'transform',
		},
		transitionTimingFunction: {
			linear: 'linear',
			in: 'cubic-bezier(0.4, 0, 1, 1)',
			out: 'cubic-bezier(0, 0, 0.2, 1)',
			'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
		transitionDuration: {
			'75': '75ms',
			'100': '100ms',
			'150': '150ms',
			'200': '200ms',
			'300': '300ms',
			'500': '500ms',
			'700': '700ms',
			'1000': '1000ms',
		},
		transitionDelay: {
			'75': '75ms',
			'100': '100ms',
			'150': '150ms',
			'200': '200ms',
			'300': '300ms',
			'500': '500ms',
			'700': '700ms',
			'1000': '1000ms',
		},
		animation: {
			none: 'none',
			spin: 'spin 1s linear infinite',
			ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			bounce: 'bounce 1s infinite',
		},
		keyframes: {
			spin: {
				to: {
					transform: 'rotate(360deg)'
				},
			},
			ping: {
				'75%, 100%': {
					transform: 'scale(2)',
					opacity: '0'
				},
			},
			pulse: {
				'50%': {
					opacity: '.5'
				},
			},
			bounce: {
				'0%, 100%': {
					transform: 'translateY(-25%)',
					animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
				},
				'50%': {
					transform: 'none',
					animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
				},
			},
		},
		lineClamp: {
			//clamp-1
			...styleData('$:$', 1, 5),
		},
		textShadow: {
			none: 'none',
			default: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
			sm: '1px 1px 3px rgb(36 37 47 / 25%)',
			md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
			lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
			xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
			'2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
			'3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
		}
	},
	variants: {
		accessibility: [],
		alignContent: [],
		alignItems: [],
		alignSelf: [],
		appearance: [],
		backgroundAttachment: [],
		backgroundClip: [],
		backgroundColor: [],
		backgroundImage: [],
		gradientColorStops: [],
		backgroundOpacity: [],
		backgroundPosition: [],
		backgroundRepeat: [],
		backgroundSize: [],
		borderCollapse: [],
		borderColor: [],
		borderOpacity: [],
		borderRadius: [],
		borderStyle: [],
		borderWidth: [],
		boxShadow: [],
		boxSizing: [],
		container: [],
		cursor: [],
		display: [],
		divideColor: [],
		divideOpacity: [],
		divideStyle: [],
		divideWidth: [],
		fill: [],
		flex: [],
		flexDirection: [],
		flexGrow: [],
		flexShrink: [],
		flexWrap: [],
		float: [],
		clear: [],
		fontFamily: [],
		fontSize: [],
		fontSmoothing: [],
		fontVariantNumeric: [],
		fontStyle: [],
		fontWeight: [],
		height: [],
		inset: [],
		justifyContent: [],
		justifyItems: [],
		justifySelf: [],
		letterSpacing: [],
		lineHeight: [],
		listStylePosition: [],
		listStyleType: [],
		margin: [],
		maxHeight: [],
		maxWidth: [],
		minHeight: [],
		minWidth: [],
		objectFit: [],
		objectPosition: [],
		opacity: [],
		order: [],
		outline: [],
		overflow: [],
		overscrollBehavior: [],
		padding: [],
		placeContent: [],
		placeItems: [],
		placeSelf: [],
		placeholderColor: [],
		placeholderOpacity: [],
		pointerEvents: [],
		position: [],
		resize: [],
		space: [],
		stroke: [],
		strokeWidth: [],
		tableLayout: [],
		textAlign: [],
		textColor: [],
		textOpacity: [],
		textDecoration: [],
		textTransform: [],
		textOverflow: [],
		userSelect: [],
		verticalAlign: [],
		visibility: [],
		whitespace: [],
		width: [],
		wordBreak: [],
		zIndex: [],
		gap: [],
		gridAutoFlow: [],
		gridTemplateColumns: [],
		gridAutoColumns: [],
		gridColumn: [],
		gridColumnStart: [],
		gridColumnEnd: [],
		gridTemplateRows: [],
		gridAutoRows: [],
		gridRow: [],
		gridRowStart: [],
		gridRowEnd: [],
		transform: [],
		transformOrigin: [],
		scale: [],
		rotate: [],
		translate: [],
		skew: [],
		transitionProperty: [],
		transitionTimingFunction: [],
		transitionDuration: [],
		transitionDelay: [],
		animation: [],
	},
	plugins: [
		require('tailwindcss-line-clamp'),
		require('tailwindcss-textshadow')
	],
}