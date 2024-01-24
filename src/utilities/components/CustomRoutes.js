import { Route, Navigate } from "react-router-dom";
import keycloak from "../../components/config/Keycloak";

export const PublicRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				keycloak.authenticated ? (
					<Navigate to="/my-account" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export const PrivateRoute = ({ component: Component, role, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				keycloak.authenticated && keycloak.hasRealmRole(role) ? (
					<Component {...props} />
				) : (
					<Navigate to="/" />
				)
			}
		/>
	);
};
