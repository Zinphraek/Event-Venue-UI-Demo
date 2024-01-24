/**
 * A filled or unfilled thumb up icon
 * @param {boolean} filled - filled or not
 * @returns The thumb up icon
 */
export const ThumbUp = ({ filled = false }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		enableBackground="new 0 0 32 32"
		version="1.1"
		xmlSpace="preserve"
		className="h-7 w-7 transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 hover:scale-110 duration-50"
	>
		<path
			d="M26.002,13H20V7.026C20,5.907,19.093,5,17.974,5c-0.615,0-1.198,0.28-1.582,0.76L9,15l0.001,0L9,15v10l3,2h12.473c0.892,0,1.676-0.592,1.921-1.451l2.49-8.725C29.43,14.908,27.993,13,26.002,13z"
			fill={filled ? "#1374e9" : "none"}
			stroke={filled ? "#ffffff" : "#000000"}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1"
		/>
		<rect
			fill={filled ? "#1374e9" : "none"}
			height="14"
			stroke={filled ? "#ffffff" : "#000000"}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1"
			width="6"
			x="3"
			y="13"
		/>
		<circle cx="6" cy="23" r="1" fill={filled ? "#ffffff" : "#000000"} />
	</svg>
);

/**
 * A filled or unfilled thumb down icon
 * @param {boolean} filled - filled or not
 * @returns The thumb down icon
 */
export const ThumbDown = ({ filled = false }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		enableBackground="new 0 0 32 32"
		version="1.1"
		xmlSpace="preserve"
		className="h-7 w-7 transition ease-in-out delay-50 active:-translate-y-1 active:scale-110 hover:scale-110 duration-50"
	>
		<path
			d="M5.998,19H12v5.974C12,26.093,12.907,27,14.026,27c0.615,0,1.198-0.28,1.582-0.76L23,17l-0.001,0L23,17V7l-3-2H7.527C6.636,5,5.852,5.592,5.607,6.451l-2.49,8.725C2.57,17.092,4.007,19,5.998,19z"
			fill={filled ? "#ffffff" : "none"}
			stroke="#000000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1"
		/>
		<rect
			fill={filled ? "#ffffff" : "none"}
			height="14"
			stroke="#000000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1"
			transform="matrix(-1 -8.988867e-11 8.988867e-11 -1 52 24)"
			width="6"
			x="23"
			y="5"
		/>
		<circle cx="26" cy="9" r="1" fill="#000000" />
	</svg>
);
