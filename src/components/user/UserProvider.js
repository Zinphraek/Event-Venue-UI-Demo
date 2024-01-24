import React, { createContext, useContext, useEffect, useState } from "react";
import { UserModel } from "../../utilities/models/UserModel";
import KeycloakService from "../config/KeycloakService";
import { getUserById } from "./userService";

const UserContext = createContext();
const UserDispatchContext = createContext();
const UserRefreshContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(UserModel);
	const [fetchUserFlag, setFetchUserFlag] = useState(false);
	const isAuthenticated = KeycloakService.isLoggedIn();
	const isUserSet = !!user.userId;

	useEffect(() => {
		if (isAuthenticated && !isUserSet) {
			getUserById(KeycloakService.getUserId(), setUser);
		}
	}, [fetchUserFlag, isAuthenticated, isUserSet]);

	return (
		<UserContext.Provider value={user}>
			<UserDispatchContext.Provider value={setUser}>
				<UserRefreshContext.Provider value={setFetchUserFlag}>
					{children}
				</UserRefreshContext.Provider>
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const userProfile = useContext(UserContext);
	const setUserProfile = useContext(UserDispatchContext);

	return { userProfile, setUserProfile };
};

export const useUserRefresh = () => {
	const setFetchUserFlag = useContext(UserRefreshContext);
	return setFetchUserFlag;
};

export default UserProvider;
