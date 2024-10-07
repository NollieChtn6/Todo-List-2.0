import App from "./App.tsx";

import React from "react";

import ReactDOM from "react-dom/client";

import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import "primereact/resources/themes/soho-light/theme.css";
import "primeicons/primeicons.css";
import "./index.css";

// https://www.codingdeft.com/posts/react-18-typescript-error/
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
	<React.StrictMode>
		<PrimeReactProvider>
			<App />
		</PrimeReactProvider>
	</React.StrictMode>,
);
