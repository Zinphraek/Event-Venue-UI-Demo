/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			borderWidth: {
				1: "1px",
				1.5: "1.5px",
			},
			colors: {
				"off-white": "#FAFAFA",
				"off-black": "#1F1F1F",
				"off-gray": "#E5E5E5",
				"off-yellow": "#F9D94C",
				"off-blue": "#2D9CDB",
				"off-red": "#EB5757",
				"off-green": "#27AE60",
				"off-purple": "#BB6BD9",
				"off-pink": "#F2994A",
				"off-orange": "#F2C94C",
				"off-brown": "#9B51E0",
				"off-cyan": "#2F80ED",
				"off-teal": "#219653",
				"off-indigo": "#2F80ED",
				"off-lime": "#BB6BD9",
				"off-emerald": "#219653",
				"off-amber": "#F2C94C",
				"off-violet": "#9B51E0",
				"off-fuchsia": "#BB6BD9",
				"off-rose": "#EB5757",
				"off-crimson": "#EB5757",
				"off-tomato": "#EB5757",
			},
			gridTemplateColumns: {
				auto: "repeat(auto-fill, minmax(100px, 10fr))",
			},
			fontFamily: {
				sans: ["Josefin Sans", "sans-serif", "Barlow Semi Condensed"],
				alata: ["Alata"],
			},
			letterSpacing: {
				widest: ".3em",
			},
			lineClamp: {
				7: "7",
				8: "8",
				9: "9",
				10: "10",
				11: "11",
				12: "12",
				13: "13",
				14: "14",
				15: "15",
				16: "16",
				17: "17",
				18: "18",
				19: "19",
				20: "20",
			},
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		function ({ addBase, config }) {
			addBase({
				progress: {
					"-webkit-appearance": "none",
					appearance: "none",
					border: "none",
					height: "0.5rem",
					borderRadius: "0.25rem",
					backgroundColor: config("theme.colors.gray.300"), // set background color to gray
				},
				"progress::-webkit-progress-bar": {
					backgroundColor: "transparent",
				},
				"progress::-webkit-progress-value": {
					backgroundColor: config("theme.colors.yellow.500"),
				},
				"progress::-moz-progress-bar": {
					backgroundColor: config("theme.colors.yellow.500"),
				},
			});
		},
	],
};
