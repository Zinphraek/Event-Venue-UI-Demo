import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import KeycloakService from "./components/config/KeycloakService";
import UserProvider from "./components/user/UserProvider";
import HttpClient from "./utilities/functions/HttpClient";
import reportWebVitals from "./reportWebVitals";
import LoadingSpinnerProvider from './utilities/components/LoadingSpinnerProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () =>
	root.render(
		<UserProvider>
			<LoadingSpinnerProvider>
			<App />
			</LoadingSpinnerProvider>
		</UserProvider>
	);

KeycloakService.initKeycloak(renderApp);
HttpClient.configure();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
