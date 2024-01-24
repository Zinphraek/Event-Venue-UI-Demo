import axios from "axios";
import { ROOT_API_URL } from "../constants/ServerEndPoints";
import KeycloakService from "../../components/config/KeycloakService";

const _axios = axios.create();

const configure = () => {
	_axios.interceptors.request.use((config) => {
		if (KeycloakService.isLoggedIn()) {
			const cb = () => {
				config.baseURL = ROOT_API_URL;
				config.headers.Authorization = `Bearer ${KeycloakService.getToken()}`;
				config.headers["Content-Type"] = "multipart/form-data";
				return Promise.resolve(config);
			};
			return KeycloakService.updateToken(cb);
		}

		// If user is not logged in
		const cb = () => {
			config.baseURL = ROOT_API_URL;
			config.headers["Content-Type"] = "multipart/form-data";
			return Promise.resolve(config);
		};

		// Returning the config if user is not logged in
		return cb();
	});
};

const getAxiosClient = () => _axios;

const HttpClient = {
	configure,
	getAxiosClient,
};

export default HttpClient;
