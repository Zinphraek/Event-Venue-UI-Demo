import keycloak from "./Keycloak";

const _kc = keycloak;

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
	_kc
		.init({
			onLoad: "check-sso",
			silentCheckSsoRedirectUri:
				`${window.location.origin}/silent-check-sso/index.html`,
			pkceMethod: "S256",
		})
		.then((authenticated) => {
			if (!authenticated) {
				console.log("user is not authenticated..!");
			}
			onAuthenticatedCallback();
		})
		.catch(console.error);
};


const doLogin = async (setUserRefreshFlag) => {
	await _kc.login({ redirectUri: window.location.href });
	if (isLoggedIn()) {
		setUserRefreshFlag((prev) => !prev);
	}
};

/**
 * Check if the location route is '/account' or its child and if so, log the user out and redirect to the home page.
 * else just log the user out.
 * 
 * @param {Location} location 
 */
const doLogout = async (location) => {
	if (location.pathname.includes("account")) {
		await _kc.logout({ redirectUri: window.location.origin });
	} else {
		await _kc.logout();
	}
}

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
	_kc.updateToken(5).then(successCallback).catch(doLogin);

const getUserId = () => _kc.tokenParsed?.sub;

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getUserFirstName = () => _kc.tokenParsed?.given_name;

const getUserLastName = () => _kc.tokenParsed?.family_name;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const loadUserProfile = () => _kc.loadUserProfile();

const getAddress = () => {
	const userAddress = {
		street: _kc.tokenParsed.address[0],
		city: _kc.tokenParsed.address[1],
		state: _kc.tokenParsed.address[2],
		zipCode: _kc.tokenParsed.address[3],
	};
	return userAddress;
};

const getUserInfo = () => {
	const userInfo = {
		id: getUserId(),
		username: getUsername(),
		firstName: getUserFirstName(),
		lastName: getUserLastName(),
		email: _kc.tokenParsed?.email,
		phone: _kc.tokenParsed?.phone ? _kc.tokenParsed?.phone[0] : "",
		dateOfBirth: _kc.tokenParsed?.dob ? _kc.tokenParsed?.dob[0] : "",
		gender: _kc.tokenParsed?.gender ? _kc.tokenParsed.gender[0] : "",
		address: _kc.tokenParsed?.address?.length === 4 ? getAddress() : "",
	};
	return userInfo;
};

const KeycloakService = {
	initKeycloak,
	doLogin,
	doLogout,
	isLoggedIn,
	getToken,
	getUserId,
	getUserInfo,
	updateToken,
	getUsername,
	getUserFirstName,
	getUserLastName,
	hasRole,
	loadUserProfile,
};

export default KeycloakService;
